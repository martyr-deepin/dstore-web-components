import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppService } from './services/app.service';
import { CategoryService } from './services/category.service';
import { DownloadingService } from './services/downloading.service';
import { MaterializeService } from './services/materialize.service';

import { TitleComponent } from './components/title/title.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CoverComponent } from './components/cover/cover.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { PhraseComponent } from './components/phrase/phrase.component';
import { TopicComponent } from './components/topic/topic.component';
import { IconComponent } from './components/icon/icon.component';
import { AssembleComponent } from './components/assemble/assemble.component';

import { AppNavComponent } from './web-components/app-nav/app-nav.component';
import { AppPagingComponent } from './web-components/app-paging/app-paging.component';
import { AppSearchComponent } from './web-components/app-search/app-search.component';
import { ImageUpdateComponent } from './web-components/image-update/image-update.component';
import { ProgressComponent } from './web-components/progress/progress.component';
import { StarComponent } from './widget/star/star.component';
import { IndicationComponent } from './widget/indication/indication.component';

import { ConvertToNumberDirective } from './directive/convert-to-number.directive';
import { DevPipe } from './pipes/dev';
import { AppInfoPipe } from './pipes/app-info';
import { AppSearchPipe } from './pipes/app-search';
import { FitLanguage } from './pipes/fit-lang';
import { FitImage } from './pipes/fit-image';
import { Ceil } from './pipes/ceil';
import { SizeHuman } from './pipes/size-human';

@NgModule({
  imports: [
    MaterializeModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppService,
    CategoryService,
    DownloadingService,
    MaterializeService,
  ],
  declarations: [
    TitleComponent,
    CarouselComponent,
    CoverComponent,
    RankingComponent,
    PhraseComponent,
    TopicComponent,
    IconComponent,
    AppNavComponent,
    AppPagingComponent,
    AppSearchComponent,
    AssembleComponent,
    ImageUpdateComponent,
    ConvertToNumberDirective,
    DevPipe,
    AppInfoPipe,
    AppSearchPipe,
    FitLanguage,
    FitImage,
    Ceil,
    SizeHuman,
    ProgressComponent,
    StarComponent,
    IndicationComponent,
  ],
  exports: [
    TitleComponent,
    CarouselComponent,
    CoverComponent,
    RankingComponent,
    PhraseComponent,
    TopicComponent,
    IconComponent,
    AppNavComponent,
    AppPagingComponent,
    AppSearchComponent,
    AssembleComponent,
    ImageUpdateComponent,
    ProgressComponent,
    StarComponent,
    IndicationComponent,
    ConvertToNumberDirective,
    DevPipe,
    AppInfoPipe,
    AppSearchPipe,
    FitLanguage,
    FitImage,
    Ceil,
    SizeHuman,
  ],
})
export class DstoreModule {}
