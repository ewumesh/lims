import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PermissionService } from 'src/app/services/user-management/permission/permission.service';
import { PermissionComponent } from './permission.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { SetPermissionComponent } from './dialog/set-permission';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PermissionComponent, SetPermissionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: PermissionComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule
   ],
  exports: [],
  providers: [PermissionService],
  entryComponents: [SetPermissionComponent]
})
export class PermissionModule {}
