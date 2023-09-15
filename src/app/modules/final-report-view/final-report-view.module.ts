import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { SuperscriptPipe } from 'src/app/shared/s-transform';
import { ReportLabSheetComponent } from './lab-sheet/lab-sheet';
import { ReportViewRawDataComponent } from './report-view-raw-data/report-view-raw-data.component';
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  declarations: [
    FinalReportViewComponent, 
    ReportRawDataComponent,
    ViewReportRemarksComponent, 
    ReportMicroRawDataComponent,
    ViewReportDoc,
    AdminFinalReportComponent,
    ReportLabSheetComponent,
    ReportViewRawDataComponent
    // SuperscriptPipe
  ],
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
    NgxPrintModule,
    MatTabsModule,
    SharedModule
  ],
  exports: [],
  providers: [FinalReportViewService, DatePipe],
})
export class FinalReportViewModule {}
