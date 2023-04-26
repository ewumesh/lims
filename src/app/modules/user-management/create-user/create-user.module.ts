import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './create-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CreateUserService } from 'src/app/services/user-management/create-user/create-user.service';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component:CreateUserComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule
   ],
  exports: [],
  providers: [CreateUserService],
})
export class CreateUserModule {}
