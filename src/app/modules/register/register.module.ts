import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { NpDatepickerModule } from 'angular-nepali-datepicker';

/** Custom components */
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NpDatepickerModule,
    MatIconModule
  ],
  exports: [],
  providers: [],
})
export class RegisterModule { }
