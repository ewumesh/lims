import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportViewComponent } from './report-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReportViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ReportViewComponent }
    ])
   ],
  exports: [],
  providers: [],
})
export class ReportViewModule {}
