import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalReportViewComponent } from './final-report-view.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FinalReportViewService } from 'src/app/services/final-report-view/final-report-view.serivce';

@NgModule({
  declarations: [FinalReportViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: FinalReportViewComponent}
    ]),

    SharedModule
  ],
  exports: [],
  providers: [FinalReportViewService],
})
export class FinalReportViewModule {}
