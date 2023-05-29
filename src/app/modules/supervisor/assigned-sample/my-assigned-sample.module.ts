import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAssignedComponent } from './my-assigned-sample.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AssignedSampleService } from 'src/app/services/supervisor/assigned-sample/assigned-sample.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AssignComponent } from './component/assign.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [MyAssignedComponent, AssignComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MyAssignedComponent}
    ]),

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
   ],
  exports: [],
  providers: [AssignedSampleService],
})
export class MyAssignedSampleModule {}
