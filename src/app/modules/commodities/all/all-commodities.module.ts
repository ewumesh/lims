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
import { AllCommoditiesService } from 'src/app/services/commodities/all-commodities/all-commodities.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule
   ],
  exports: [],
  providers: [AllCommoditiesService],
})
export class AllCommoditiesModule {}
