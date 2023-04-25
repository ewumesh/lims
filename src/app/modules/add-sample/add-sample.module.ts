import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddSampleFormComponent } from './add-sample.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { NpDatepickerModule } from 'angular-nepali-datepicker';

@NgModule({
  declarations: [AddSampleFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AddSampleFormComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    NpDatepickerModule
   ],
  exports: [],
  providers: [],
})
export class AddSampleModule {}
