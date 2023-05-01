import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityCategoriesComponent } from './commodity-category.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CommodityCategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CommodityCategoriesComponent}
    ]),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,

    DeleteConfirmModule
   ],
  exports: [],
  providers: [CommodityCategoryService],
})
export class CommodityCategoriesModule {}
