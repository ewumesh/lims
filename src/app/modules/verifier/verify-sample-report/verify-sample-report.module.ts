import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifySampleReportomponent } from './verify-sample-report';
import { RouterModule } from '@angular/router';
import { ReportComponent } from 'src/app/shared/report/report';
import { VerifyReportComponent } from 'src/app/shared/verify-report/verify-report';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { VerificationRemarksComponent } from './component/verification-remarks';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewVieriferRemarks } from 'src/app/shared/verify-report/view-remarks/view-remarks';
import { MicroRawDataVerifierComponent } from 'src/app/shared/verify-report/view-micro-raw/micro-raw-data-verifier';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [VerifySampleReportomponent, VerifyReportComponent, VerificationRemarksComponent,ViewVieriferRemarks,MicroRawDataVerifierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VerifySampleReportomponent}
    ]),
    AvatarModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    SharedModule
   ],
  exports: [],
  providers: [],
})
export class VerifySampleReportModule {}
