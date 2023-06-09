import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReportComponent } from './user-report.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserReportService } from 'src/app/services/user/user-report/user-report.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [UserReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: UserReportComponent}
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
  providers: [UserReportService],
})
export class UserReportModule {}
