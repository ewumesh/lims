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
import { AvatarModule } from 'ngx-avatar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReAssignComponent } from './re-assign/re-assign';
import { MatSelectModule } from '@angular/material/select';
import { ReCheckComponent } from './re-check/re-check';
import { MatTableModule } from '@angular/material/table';
import { SupervisorViewRemarksComponent } from './view-remarks/view-remarks';
import { SupervisorViewRawDataComponent } from './view-raw-data/view-raw-data';

@NgModule({
  declarations: [SampleReportComponent, ReportComponent, VerificationComponent,ReAssignComponent, ReCheckComponent,SupervisorViewRemarksComponent,SupervisorViewRawDataComponent],
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

    SharedModule
   ],
  exports: [],
  providers: [SampleReportService],
})
export class SampleReportModule {}
