import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { SnackbarModule } from 'src/app/shared/snackbar/snackbar.module';
import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/auth/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LoginComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SnackbarModule,
    MatProgressSpinnerModule
   ],
  exports: [],
  providers: [AuthenticationService],
})
export class LoginModule {}
