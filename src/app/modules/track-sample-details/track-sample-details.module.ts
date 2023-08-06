import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackSampleDetailsComponent } from './track-sample-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { TrackSampleDetailsService } from 'src/app/services/track-sample-details/track-sample-details.service';
import { RouterModule } from '@angular/router';
import { ViewTrackDoc } from './view-docs';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TrackSampleDetailsComponent,ViewTrackDoc],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TrackSampleDetailsComponent}
    ]),
    MatDialogModule,

    AvatarModule,
    SharedModule
   ],
  exports: [],
  providers: [TrackSampleDetailsService],
})
export class TrackSampleDetailsModule {}
