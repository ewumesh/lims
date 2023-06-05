import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalLabReportComponent } from './final-lab-report.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FinalLabReportService } from 'src/app/services/lab-report-details/final-lab-report.service';

@NgModule({
  declarations: [FinalLabReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: FinalLabReportComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    AvatarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    SharedModule
   ],
  exports: [],
  providers: [FinalLabReportService],
})
export class FinalLabReportModule {}
