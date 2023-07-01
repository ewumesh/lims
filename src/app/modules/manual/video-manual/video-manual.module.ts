import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoManualComponent } from './video-manual.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VideoManualComponent}
    ])
  ],
  declarations: [VideoManualComponent]
})
export class VideoManualModule { }
