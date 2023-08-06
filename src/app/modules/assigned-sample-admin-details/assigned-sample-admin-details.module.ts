import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedSampleAdminDetailsComponent } from './assigned-sample-admin-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignedSampleAdminDetailsService } from 'src/app/services/assigned-sample-admin-details/assigned-sample-admin-details.service';
import { ReAssignSupervisorComponent } from './re-assign-supervisor/re-assign-supervisor';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ViewAssignedSampleDoc } from './view-docs';

@NgModule({
  declarations: [AssignedSampleAdminDetailsComponent, ReAssignSupervisorComponent,ViewAssignedSampleDoc],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AssignedSampleAdminDetailsComponent}]),

    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,

    SharedModule
  ],
  exports: [],
  providers: [AssignedSampleAdminDetailsService],
})
export class AssignedSampleAdminDetailsModule {}
