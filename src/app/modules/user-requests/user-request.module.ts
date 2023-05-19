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

    DeleteConfirmModule
  ],
  exports: [],
  providers: [UserRequestsService],
})
export class UserRequestsModule {}
