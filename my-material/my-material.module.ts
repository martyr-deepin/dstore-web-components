import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatDialogModule,
} from '@angular/material';

import { MyMatPaginatorIntl } from './my-paginator-intl';
import { MyPaginatorDirective } from './directives/my-paginator.directive';
import { SearchComponent } from './components/search/search.component';

const modules = [
  ReactiveFormsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatDialogModule,
];
const directives = [MyPaginatorDirective];
const components = [SearchComponent];

@NgModule({
  exports: [...modules, ...directives, ...components],
  imports: [CommonModule, ...modules],
  providers: [{ provide: MatPaginatorIntl, useClass: MyMatPaginatorIntl }],
  declarations: [...directives, ...components],
})
export class MyMaterialModule {}
