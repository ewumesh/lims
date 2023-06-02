import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabReportDetailsService } from 'src/app/services/supervisor/lab-report-details/lab-report-details.service';
import { LabReportDetailsComponent } from './lab-report-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [LabReportDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LabReportDetailsComponent}
    ]),

    AvatarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

    SharedModule
   ],
  exports: [],
  providers: [LabReportDetailsService],
})
export class LabReportDetailsModule {}
