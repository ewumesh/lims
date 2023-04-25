import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';

import { MySampleComponent } from './my-sample.component';

@NgModule({
  declarations: [MySampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MySampleComponent}
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule
   ],
  exports: [],
  providers: [],
})
export class MySampleModule {}
