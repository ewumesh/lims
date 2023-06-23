import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateAdminComponent } from './create-admin.component';
import { CreateAdminService } from 'src/app/services/user-management/create-admin/create-admin.service';

@NgModule({
  declarations: [CreateAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component:CreateAdminComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule
   ],
  exports: [],
  providers: [CreateAdminService],
})
export class CreateAdminModule {}
