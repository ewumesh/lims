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

    DeleteConfirmModule
   ],
  exports: [],
  providers: [ParameterService],
})
export class ParameterModule {}
