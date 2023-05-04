import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingComponent } from './pricing.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TableModule } from 'src/app/shared/table/table.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PricingService } from 'src/app/services/pricing/pricing.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    PricingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: PricingComponent}
    ]),
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [],
  providers: [PricingService],
})
export class PricingModule {}
