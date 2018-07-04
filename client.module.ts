import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './services/store.service';
import { CircleButtonComponent } from './components/circle-button/circle-button.component';
import { JobButtonComponent } from './components/job-button/job-button.component';

@NgModule({
  imports: [CommonModule],
  providers: [StoreService],
  exports: [CircleButtonComponent, JobButtonComponent],
  declarations: [CircleButtonComponent, JobButtonComponent],
})
export class ClientModule {}
