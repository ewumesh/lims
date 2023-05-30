import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleVerifyDetailsComponent } from './sample-verify-details.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SampleVerifyDetailsService } from 'src/app/services/verifier/sample-verify-details/sample-verify-details.service';

@NgModule({
  declarations: [SampleVerifyDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SampleVerifyDetailsComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule
   ],
  exports: [],
  providers: [SampleVerifyDetailsService],
})
export class SampleVerifyDetailsModule {}
