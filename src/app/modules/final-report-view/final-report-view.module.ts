import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalReportViewComponent } from './final-report-view.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FinalReportViewService } from 'src/app/services/final-report-view/final-report-view.serivce';
import { NgxBarcodeModule } from 'ngx-barcode';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportRawDataComponent } from './raw-data/report-raw-data';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewReportRemarksComponent } from './view-remarks';
import { AvatarModule } from 'ngx-avatar';
import { MatTabsModule } from '@angular/material/tabs';
import { ReportMicroRawDataComponent } from './report-view-micro-raw-data/micro-raw-data';
import { ViewReportDoc } from './view-docs';
import { AdminFinalReportComponent } from './view-sample/admin-view-sample';

@NgModule({
  declarations: [FinalReportViewComponent, ReportRawDataComponent,ViewReportRemarksComponent, ReportMicroRawDataComponent,ViewReportDoc,AdminFinalReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: FinalReportViewComponent}
    ]),
    NgxBarcodeModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    AvatarModule,
    MatTabsModule,
    SharedModule
  ],
  exports: [],
  providers: [FinalReportViewService],
})
export class FinalReportViewModule {}
