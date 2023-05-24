import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SampleRequestDetailsComponent } from './sample-request-details';
import { SampleRequestDetailsService } from 'src/app/services/sample-request-details/sample-request-details.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignSampleDialogComponent } from './payment/assign-sample-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AssignSampleComponent } from './assign/assign-sample.component';

@NgModule({
  declarations: [SampleRequestDetailsComponent, AssignSampleDialogComponent, AssignSampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SampleRequestDetailsComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule
   ],
  exports: [],
  providers: [SampleRequestDetailsService],
})
export class SampleRequestDetailsModule {}
