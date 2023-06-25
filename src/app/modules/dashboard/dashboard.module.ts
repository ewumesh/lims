import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DashboarService } from 'src/app/services/dashboard/dashboard.service';
// import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent},

    ]), MatIconModule,
    // NgChartsModule
   ],
  exports: [],
  providers:
  [
    DashboarService,
    // { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],
})
export class DashboardModule {}
