import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar';

import { SnackbarModule } from 'src/app/shared/snackbar/snackbar.module';
import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

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
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatBottomSheetModule,
    MatToolbarModule
   ],
  exports: [],
  providers: [AuthenticationService],
})
export class LoginModule {}
