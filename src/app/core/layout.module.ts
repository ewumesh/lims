import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule,
    RouterModule.forChild([
      {
        path: '', loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(b => b.DashboardModule)
      },

      {path: 'add-sample', loadChildren: () => import('src/app/modules/add-sample/add-sample.module').then(m => m.AddSampleModule)},

      {path: 'comodities', loadChildren: () => import('src/app/modules/comodities/comodities.module').then(m => m.ComoditiesModule)},

      {path: 'my-samples', loadChildren: () => import('src/app/modules/my-sample/my-sample.module').then(m => m.MySampleModule)},

      {path: 'report-view', loadChildren: () => import('src/app/modules/report-view/report-view.module').then(m => m.ReportViewModule)},

      {path: 'my-account', loadChildren: () => import('src/app/modules/my-account/my-account.module').then(m => m.MyAccountModule)},

      {path: 'pricing', loadChildren: () => import('src/app/modules/pricing/pricing.module').then(m => m.PricingModule)},

      // For Admin
      {path: 'user-requests', loadChildren: () => import('src/app/modules/user-requests/user-request.module').then(m => m.UserRequestsModule)},

      {path: 'sample-requests', loadChildren: () => import('src/app/modules/sample-requests/sample-requests.module').then(m => m.SampleRequestsModule)},

      {path: 'create-user', loadChildren: () => import('src/app/modules/user-management/create-user/create-user.module').then(m => m.CreateUserModule)},

      {path: 'create-admin', loadChildren: () => import('src/app/modules/user-management/create-admin/create-admin.module').then(m => m.CreateAdminModule)},

      {path: 'all-users', loadChildren: () => import('src/app/modules/user-management/all-user/all-user.module').then(m => m.AllUsersModule)},

      {path: 'search-sample', loadChildren: () => import('src/app/modules/search-sample/search-sampole.module').then(m => m.SearchSampleModule)},

      {path: 'lab-report', loadChildren: () => import('src/app/modules/lab-report/lab-report.module').then(m => m.LabReportModule)},

      {path: 'assigned-sample', loadChildren: () => import('src/app/modules/assigned-sample/assigned-sample.module').then(m => m.AssignedSampleModule)},

      {path: 'settings/client-category', loadChildren: () => import('src/app/modules/setting/category/client-category.module').then(m => m.ClientCategoryModule)},

      {path: 'settings/commodity-category', loadChildren: () => import('src/app/modules/setting/commodity-category/commodity-category.module').then(m => m.CommodityCategoriesModule)},

      {path: 'user-details/:id', loadChildren: () => import('src/app/modules/user-management/view-user/view-user.module').then(m => m.ViewUserDetailsModule)}
    ]),
  ],
  exports: [],
  providers: [],
})
export class LayoutModule { }
