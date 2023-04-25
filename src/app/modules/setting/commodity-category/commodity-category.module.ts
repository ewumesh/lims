import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityCategoriesComponent } from './commodity-category.component';
import { RouterModule } from '@angular/router';
import { AddOrUpdateCommodityCategoryComponent } from './components/add-or-update-commodity-category.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommodityCategoriesComponent,AddOrUpdateCommodityCategoryComponent],
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

    DeleteConfirmModule
   ],
  exports: [],
  providers: [],
})
export class CommodityCategoriesModule {}
