import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedSampleComponent } from './assigned-sample.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AssignedSampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AssignedSampleComponent}
    ])
   ],
  exports: [],
  providers: [],
})
export class AssignedSampleModule {}
