import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './all-user.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AllUsersService } from 'src/app/services/user-management/all-user/all-user.service';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserActivationModule } from 'src/app/shared/deactivate-activate-user/user-activation.module';

@NgModule({
  declarations: [AllUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AllUsersComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule,

    DeleteConfirmModule,
    UserActivationModule,
    SharedModule
   ],
  exports: [],
  providers: [AllUsersService],
})
export class AllUsersModule {}
