import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleReportComponent } from './sample-report.component';
import { RouterModule } from '@angular/router';
import { ReportComponent } from 'src/app/shared/report/report';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { VerificationComponent } from './verify/s-verify';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SampleReportComponent, ReportComponent, VerificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SampleReportComponent}
    ]),
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,

    SharedModule
   ],
  exports: [],
  providers: [SampleReportService],
})
export class SampleReportModule {}
