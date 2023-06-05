import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifySampleReportomponent } from './verify-sample-report';
import { RouterModule } from '@angular/router';
import { ReportComponent } from 'src/app/shared/report/report';
import { VerifyReportComponent } from 'src/app/shared/verify-report/verify-report';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VerifySampleReportomponent, VerifyReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VerifySampleReportomponent}
    ]),
    SharedModule
   ],
  exports: [],
  providers: [],
})
export class VerifySampleReportModule {}
