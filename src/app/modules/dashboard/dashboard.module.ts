import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DashboarService } from 'src/app/services/dashboard/dashboard.service';
import { NgChartsModule } from 'ng2-charts';
import { AdminDashboard } from './admin/admin';
import { SmuDashboard } from './smu/smu';
import { SupervisorDashboard } from './supervisor/supervisor';
import { AnalystDashboard } from './analyst/analyst';
import { VerifierDashboard } from './verifier/verifier';
import { UserDashboard } from './user/user';
import { NgApexchartsModule } from "ng-apexcharts";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboard,
    SmuDashboard,
    SupervisorDashboard,
    AnalystDashboard,
    VerifierDashboard,
    UserDashboard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent},

    ]), MatIconModule,
    NgChartsModule,
    SharedModule,
    NgApexchartsModule
   ],
  exports: [],
  providers:
  [
    DashboarService,
    // { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],
})
export class DashboardModule {}
