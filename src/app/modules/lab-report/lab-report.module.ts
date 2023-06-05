import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabReportComponent } from './lab-report.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminLabReportService } from 'src/app/services/lab-report/admin-lab-report.service';
import { AvatarModule } from 'ngx-avatar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LabReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LabReportComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AvatarModule,
    MatIconModule,

    SharedModule
   ],
  exports: [],
  providers: [AdminLabReportService],
})
export class LabReportModule {}
