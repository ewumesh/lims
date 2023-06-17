import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedSampleAdminComponent } from './assigend-sample-admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { AssignedSampleAdminService } from 'src/app/services/assigned-sample-admin/assigend-sample-admin.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AssignedSampleAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AssignedSampleAdminComponent}]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    AvatarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,

    SharedModule
   ],
  exports: [],
  providers: [AssignedSampleAdminService],
})
export class AssignedSampleAdminModule {}
