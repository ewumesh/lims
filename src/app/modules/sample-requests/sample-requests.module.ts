import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleRequestsComponent } from './sample-requests.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SampleRequestsComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', component: SampleRequestsComponent}
    ])
   ],
  exports: [],
  providers: [],
})
export class SampleRequestsModule {}
