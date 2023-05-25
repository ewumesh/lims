import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportViewComponent } from './report-view.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { ReportViewService } from 'src/app/services/report-view/report-view.service';

@NgModule({
  declarations: [ReportViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ReportViewComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatChipsModule,
    MatCardModule
   ],
  exports: [],
  providers: [ReportViewService],
})
export class ReportViewModule {}
