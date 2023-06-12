import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackSampleComponent } from './track-sample.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TrackSampleService } from 'src/app/services/track-sample/track-sample.service';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [TrackSampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TrackSampleComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,MatSelectModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    AvatarModule,
    SharedModule
   ],
  exports: [],
  providers: [TrackSampleService],
})
export class TrackSampleModule {}
