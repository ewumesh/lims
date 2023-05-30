import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleVerifyComponent } from './sample-verify.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SampleVerifyService } from 'src/app/services/verifier/sample-verify/sample-verify.service';

@NgModule({
  declarations: [SampleVerifyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SampleVerifyComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,

    SharedModule
   ],
  exports: [],
  providers: [SampleVerifyService],
})
export class SampleVerifyModule {}
