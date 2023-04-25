import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { ComoditiesComponent } from './comodities.component';
import { ComoditiesService } from 'src/app/services/commodity/comodities.service';
import { TableModule } from 'src/app/shared/table/table.module';

@NgModule({
  declarations: [
    ComoditiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ComoditiesComponent}
    ]),
    MatCardModule,
    TableModule
   ],
  exports: [],
  providers: [ComoditiesService],
})
export class ComoditiesModule {}
