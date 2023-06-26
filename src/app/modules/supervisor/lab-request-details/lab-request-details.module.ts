import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabRequestDetailsComponent } from './lab-request-details';
import { RouterModule } from '@angular/router';
import { LabRequestDetailsService } from 'src/app/services/supervisor/lab-request-details/lab-request-details.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignComponent } from './component/assign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [LabRequestDetailsComponent, AssignComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LabRequestDetailsComponent}
    ]),
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    AvatarModule,
    SharedModule
  ],
  exports: [],
  providers: [LabRequestDetailsService],
})
export class LabRequestDetailsModule {}
