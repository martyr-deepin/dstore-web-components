import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

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
import { iconComponent } from './components/icon/icon.component';

@NgModule({
  imports: [MaterializeModule, BrowserModule, HttpModule],
  providers: [
    AppService,
    CategoryService,
    DownloadingService,
    MaterializeService
  ],
  declarations: [
    TitleComponent,
    CarouselComponent,
    CoverComponent,
    RankingComponent,
    PhraseComponent,
    TopicComponent,
    iconComponent
  ],
  exports: [
    TitleComponent,
    CarouselComponent,
    CoverComponent,
    RankingComponent,
    PhraseComponent,
    TopicComponent,
    iconComponent
  ]
})
export class DstoreModule {}
