import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackSampleDetailsComponent } from './track-sample-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { TrackSampleDetailsService } from 'src/app/services/track-sample-details/track-sample-details.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TrackSampleDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TrackSampleDetailsComponent}
    ]),

    AvatarModule,
    SharedModule
   ],
  exports: [],
  providers: [TrackSampleDetailsService],
})
export class TrackSampleDetailsModule {}
