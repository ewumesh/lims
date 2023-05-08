import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterComponent } from './parameter.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParameterService } from 'src/app/services/commodities/parameter/parameter.service';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [ParameterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'', component: ParameterComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,

    DeleteConfirmModule
   ],
  exports: [],
  providers: [ParameterService, CommodityCategoryService],
})
export class ParameterModule {}
