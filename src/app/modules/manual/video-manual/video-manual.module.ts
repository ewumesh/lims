import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoManualComponent } from './video-manual.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VideoManualComponent}
    ]),
    MatMenuModule
  ],
  declarations: [VideoManualComponent]
})
export class VideoManualModule { }
