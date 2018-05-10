import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ImageError, ImageErrorString } from '../../services/errno';
import { BaseService } from '../../services/base.service';
import { MaterializeService } from '../../services/materialize.service';
import { ImageType } from '../../services/app';

@Component({
  selector: 'app-image-update',
  templateUrl: './image-update.component.html',
  styleUrls: ['./image-update.component.scss'],
})
export class ImageUpdateComponent implements OnInit {
  @Input()
  set src(src: string) {
    if (src && !this.imgSrc) {
      this.imgSrc = `${this.server}/images/${src}`;
    }
  }

  @Input() multiple = false;
  @Input() types: string[] = [];
  @Input() maxFileSize = 12e6;
  @Input() width: number;
  @Input() height: number;
  @Input() limitImgSize = false;
  @Input() uploadType = ImageType.Icon;
  @Input() title = '';
  @Output() upload = new EventEmitter<string>();

  @ViewChild('imageInput') imageInput;

  server: string;
  imgSrc: string | SafeUrl = '';

  constructor(
    private el: ElementRef,
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    private materializeService: MaterializeService,
  ) {
    this.server = BaseService.serverHosts.operationServer;
  }

  ngOnInit() {
    if (!this.width) {
      this.width = this.el.nativeElement.clientWidth;
    }
    if (!this.height) {
      this.height = this.el.nativeElement.clientHeight;
    }

    // 绑定文件输入框事件
    Observable.fromEvent(this.imageInput.nativeElement, 'change')
      .map((event: Event) => {
        return (<HTMLInputElement>event.target).files;
      })
      // 多文件展开处理
      .mergeMap(files => Observable.from(Array.from(files)))
      .mergeMap(file => {
        // 检查文件大小和类型
        if (file.size > this.maxFileSize) {
          throw ImageError.FileSize;
        }
        if (this.types.length > 0) {
          const [type, format] = file.type.split('/');
          if (type !== 'image' || !this.types.includes(format)) {
            throw ImageError.Format;
          }
        }
        // 读取文件内容
        const r = new FileReader();
        r.readAsDataURL(file);
        return (
          Observable.merge(
            Observable.fromEvent(r, 'load'),
            Observable.fromEvent(r, 'error').flatMap(err => Observable.throw(ImageError.Unknown)),
          )
            .map((event: ProgressEvent) => (<FileReader>event.currentTarget).result as string)
            // 从文件创建图片资源
            .mergeMap(result => {
              const img = new Image();
              img.src = result;
              return Observable.merge(
                Observable.fromEvent(img, 'load'),
                Observable.fromEvent(img, 'error').flatMap(err =>
                  Observable.throw(ImageError.File),
                ),
              ).map((event: Event) => event.target as HTMLImageElement);
            })
            .map(img => {
              // 检查图片尺寸
              if (this.limitImgSize) {
                if (this.width !== img.width || this.height !== img.height) {
                  throw ImageError.ImgSize;
                }
              }
              // 缩放图片
              const canvas = document.createElement('canvas');
              canvas.width = this.width;
              canvas.height = canvas.width * img.height / img.width;
              canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
              return canvas.toDataURL();
            })
            .mergeMap(dataURL => {
              // 上传图片
              const formData = new FormData();
              formData.append('type', this.uploadType.toString());
              formData.append('file', file);
              return this.http
                .post(`${this.server}/api/upload`, formData)
                .map((result: { path: string }) => {
                  this.upload.emit(result.path);
                  this.materializeService.toastSuccess('图片上传成功');
                  return dataURL;
                });
            })
        );
      })
      // 捕获错误
      .catch((err, caught) => {
        if (ImageErrorString[err as ImageError]) {
          err = ImageErrorString[err];
        }
        this.materializeService.toastError(err);
        this.upload.emit((this.imgSrc = ''));
        return caught;
      })
      // 预览图片
      .subscribe(dataURL => {
        this.imgSrc = this.domSanitizer.bypassSecurityTrustUrl(dataURL);
      });
  }
  // 图片类型
  get accept() {
    if (this.types.length === 0) {
      return 'image/*';
    }
    return this.types.map(t => `image/${t}`).join(',');
  }
  // 图片描述
  get desc() {
    const strArr = [];
    if (this.title) {
      strArr.push(this.title);
    }
    if (this.limitImgSize) {
      strArr.push(`尺寸${this.width}X${this.height}`);
    }
    if (this.types.length > 0) {
      strArr.push('格式' + this.types.join('，'));
    }
    return strArr.join('，');
  }
}
