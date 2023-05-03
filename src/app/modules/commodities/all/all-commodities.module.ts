import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommoditiesComponent } from './all-commodities.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [AllCommoditiesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AllCommoditiesComponent}
    ]),
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule
   ],
  exports: [],
  providers: [],
})
export class AllCommoditiesModule {}
