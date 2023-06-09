import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestsComponent } from './user-request.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { UserRequestsService } from 'src/app/services/user-requests/user-requests.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [UserRequestsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: UserRequestsComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,

    DeleteConfirmModule,
    SharedModule
  ],
  exports: [],
  providers: [UserRequestsService],
})
export class UserRequestsModule {}
