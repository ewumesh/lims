import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';

import { ViewUserDetailsComponent } from './view-user.component';
import { ViewUserDetailsService } from 'src/app/services/user-management/view-user/view-user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ApproveUserComponent } from './approve/approve-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ViewUserDetailsComponent,
    ApproveUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ViewUserDetailsComponent}
    ]),
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
   ],
  exports: [],
  providers: [ViewUserDetailsService],
})
export class ViewUserDetailsModule {}
