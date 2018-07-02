import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './services/store.service';

@NgModule({
  imports: [CommonModule],
  providers: [StoreService],
  exports: [],
  declarations: [],
})
export class ClientModule {}
