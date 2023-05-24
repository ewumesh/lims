import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportViewComponent } from './report-view.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReportViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ReportViewComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
   ],
  exports: [],
  providers: [],
})
export class ReportViewModule {}
