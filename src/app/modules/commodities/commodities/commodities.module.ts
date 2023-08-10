import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommoditiesComponent } from './commodities.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommoditiesService } from 'src/app/services/commodities/commodities/commodities.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { MatMenuModule } from '@angular/material/menu';
import { AddCommodityComponent } from './add-commodities/add-commodity.component';

@NgModule({
  declarations: [CommoditiesComponent, AddCommodityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CommoditiesComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule
   ],
  exports: [],
  providers: [CommoditiesService, CommodityCategoryService],
})
export class CommoditiesModule {}
