import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestRequestComponent } from './test-request.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TestRequestService } from 'src/app/services/analyst/test-request/test-request.service';

@NgModule({
  declarations: [TestRequestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TestRequestComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,

    DeleteConfirmModule

   ],
  exports: [],
  providers: [TestRequestService],
})
export class TestRequestModule {}
