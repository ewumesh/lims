import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabReportComponent } from './lab-report.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LabReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LabReportComponent}
    ])
   ],
  exports: [],
  providers: [],
})
export class LabReportModule {}
