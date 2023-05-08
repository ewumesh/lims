import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TestReportComponent } from './test-report.component';

@NgModule({
  declarations: [TestReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TestReportComponent}
    ])
   ],
  exports: [],
  providers: [],
})
export class TestReportModule {}
