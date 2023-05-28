import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabRequestComponent } from './lab-request.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabRequestService } from 'src/app/services/supervisor/lab-request/lab-request.service';
import { AvatarModule } from 'ngx-avatar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusHandlerDirective } from 'src/app/shared/status-handler/status-handler';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LabRequestComponent,
    StatusHandlerDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LabRequestComponent}
    ]),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    AvatarModule,
    MatDatepickerModule,
    MatNativeDateModule
   ],
  exports: [],
  providers: [LabRequestService],
})
export class LabRequestModule {}
