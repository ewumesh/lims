import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { DataPropertyGetterPipe } from './data-property-grater';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    TableComponent,
    DataPropertyGetterPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
   ],
  exports: [
    TableComponent,
    DataPropertyGetterPipe
  ],
  providers: [],
})
export class TableModule {}
