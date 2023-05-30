import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabReportComponent } from './lab-report.component';
import { RouterModule } from '@angular/router';
import { LabReportService } from 'src/app/services/supervisor/lab-report/lab-report.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [LabReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LabReportComponent}
    ]),
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
   ],
  exports: [],
  providers: [LabReportService],
})
export class LabReportModule {}
