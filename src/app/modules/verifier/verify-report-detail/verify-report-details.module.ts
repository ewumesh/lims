import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyReportDetailsComponent } from './verify-report-details.component';
import { RouterModule } from '@angular/router';
import { VerifyReportDetailsService } from 'src/app/services/verifier/verify-report-details/verify-report-details.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    VerifyReportDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VerifyReportDetailsComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule
   ],
  exports: [],
  providers: [VerifyReportDetailsService],
})
export class VerifyReportDetailsModule {}
