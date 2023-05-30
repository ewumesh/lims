import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyReportComponent } from './verify-report.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [VerifyReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VerifyReportComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule
   ],
  exports: [],
  providers: [],
})
export class VerifyReportModule {}
