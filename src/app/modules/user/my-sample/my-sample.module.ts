import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';

import { MySampleComponent } from './my-sample.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MySampleService } from 'src/app/services/my-sample/my-sample.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';

@NgModule({
  declarations: [MySampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MySampleComponent}
    ]),
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    DeleteConfirmModule
   ],
  exports: [],
  providers: [MySampleService],
})
export class MySampleModule {}
