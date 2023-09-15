import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { AvatarModule } from 'ngx-avatar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReAssignComponent } from './re-assign/re-assign';
import { MatSelectModule } from '@angular/material/select';
import { ReCheckComponent } from './re-check/re-check';
import { MatTableModule } from '@angular/material/table';
import { SupervisorViewRemarksComponent } from './view-remarks/view-remarks';
import { SupervisorViewRawDataComponent } from './view-raw-data/view-raw-data';
import { MicroRawDataComponent } from './micro-raw-data/micro-raw-data';
import { MatTabsModule } from '@angular/material/tabs';
import { SuperscriptPipe } from 'src/app/shared/s-transform';
import { SupervisorLabSheetComponent } from './supervisor-lab-sheet/supervisor-lab-sheet.component';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [SampleReportComponent, ReportComponent, VerificationComponent,ReAssignComponent, ReCheckComponent,SupervisorViewRemarksComponent,SupervisorViewRawDataComponent, MicroRawDataComponent,
    SupervisorLabSheetComponent
    // , 
    // SuperscriptPipe
  ],
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
    MatSelectModule,
    AvatarModule,
    MatTooltipModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    NgxPrintModule,
    SharedModule
   ],
  exports: [],
  providers: [SampleReportService, DatePipe],
})
export class SampleReportModule {}
