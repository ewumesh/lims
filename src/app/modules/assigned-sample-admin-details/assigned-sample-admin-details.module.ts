import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedSampleAdminDetailsComponent } from './assigned-sample-admin-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignedSampleAdminDetailsService } from 'src/app/services/assigned-sample-admin-details/assigned-sample-admin-details.service';

@NgModule({
  declarations: [AssignedSampleAdminDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AssignedSampleAdminDetailsComponent}]),

    SharedModule
  ],
  exports: [],
  providers: [AssignedSampleAdminDetailsService],
})
export class AssignedSampleAdminDetailsModule {}
