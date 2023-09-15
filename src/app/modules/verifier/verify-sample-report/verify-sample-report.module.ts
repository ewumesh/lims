import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { SuperscriptPipe } from 'src/app/shared/s-transform';
import { VerifierReportComponent } from './view-sample/verifier-view-sample';
import { VerifyLabSheetComponent } from 'src/app/shared/verify-report/lab-shhet/labsheet';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NpDatepickerModule } from 'angular-nepali-datepicker';
import { MatRadioModule } from '@angular/material/radio';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [VerifySampleReportomponent, VerifyReportComponent, VerificationRemarksComponent,ViewVieriferRemarks,MicroRawDataVerifierComponent, 
    VerifierReportComponent, VerifyLabSheetComponent
    // SuperscriptPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VerifySampleReportomponent}
    ]),
    AvatarModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    NpDatepickerModule,
    MatRadioModule,
    MatTabsModule,
    NgxPrintModule,
    SharedModule
   ],
  exports: [],
  providers: [DatePipe],
})
export class VerifySampleReportModule {}
