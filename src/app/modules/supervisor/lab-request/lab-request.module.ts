import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabRequestComponent } from './lab-request.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [LabRequestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LabRequestComponent}
    ]),
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule
   ],
  exports: [],
  providers: [],
})
export class LabRequestModule {}
