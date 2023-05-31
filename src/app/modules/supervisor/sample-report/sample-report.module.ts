import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleReportComponent } from './sample-report.component';
import { RouterModule } from '@angular/router';
import { ReportComponent } from 'src/app/shared/report/report';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SampleReportComponent, ReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SampleReportComponent}
    ]),
    SharedModule
   ],
  exports: [],
  providers: [SampleReportService],
})
export class SampleReportModule {}
