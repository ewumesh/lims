import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
// import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent},

    ]), MatIconModule
   ],
  exports: [],
  providers: [],
})
export class DashboardModule {}
