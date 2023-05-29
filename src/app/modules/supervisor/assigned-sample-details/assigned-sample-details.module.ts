import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedSampleDetailsComponent } from './assigned-sample-details';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from 'ngx-avatar';
import { StatusHandlerDirective } from 'src/app/shared/status-handler/status-handler';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AssignedSampleDetailsComponent,
    StatusHandlerDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AssignedSampleDetailsComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    AvatarModule,
    MatDatepickerModule,
    MatNativeDateModule
   ],
  exports: [],
  providers: [],
})
export class AssignedSampleDetailsModule {}
