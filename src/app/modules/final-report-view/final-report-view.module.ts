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

@NgModule({
  declarations: [FinalReportViewComponent, ReportRawDataComponent,ViewReportRemarksComponent],
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
    SharedModule
  ],
  exports: [],
  providers: [FinalReportViewService],
})
export class FinalReportViewModule {}
