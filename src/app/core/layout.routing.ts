import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleGuard } from "../services/role.guard";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found";
import { ForbiddenComponent } from "./components/forbidden/forbidden";

const routes: Routes = [
  {
    path: '', loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(b => b.DashboardModule)
  },

  // User Routes...
  // Commodity Pricing
  {
    path: 'commodity-pricing',
    canActivate: [RoleGuard],
    data: {
      requiredRole: 5
    },
    loadChildren: () => import('src/app/modules/user/pricing/pricing.module').
      then(m => m.PricingModule)
  },

  // Users' Added Sample
  {
    path: 'my-sample',
    canActivate: [RoleGuard],
    data: {
      requiredRole: 5
    },
    loadChildren: () => import('src/app/modules/user/my-sample/my-sample.module')
      .then(m => m.MySampleModule)
  },

  // Users' Added Sample Report
  {
    path: 'report-view',
    canActivate: [RoleGuard],
    data: {
      requiredRole: 5
    },
    loadChildren: () => import('src/app/modules/user/report-view/report-view.module').
      then(m => m.ReportViewModule)
  },

  // End User Routes...

  // Supervisor Routes...
  // Lab Request
  {
    path: 'samples',
    canActivate: [RoleGuard],
    data: {
      requiredRole: 3
    },
    loadChildren: () => import('src/app/modules/supervisor/assigned-sample/my-assigned-sample.module').
      then(m => m.MyAssignedSampleModule)
  },

  // Assigned Samples
  {
    path: 'assigned-sample',
    canActivate: [RoleGuard],
    data: {
      requiredRole: 3
    },
    loadChildren: () => import('src/app/modules/supervisor/lab-request/lab-request.module')
    .then(m => m.LabRequestModule)
  },

  // Assigned Sample Details...
  {
    path: 'assigned-sample-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: 3
    },
    loadChildren: () => import('src/app/modules/supervisor/assigned-sample-details/assigned-sample-details.module')
    .then(m => m.AssignedSampleDetailsModule)
  },
  // End Supervisor Routes...

  { path: 'add-sample', loadChildren: () => import('src/app/modules/add-sample/add-sample.module').then(m => m.AddSampleModule) },

  { path: 'add-sample/:id', loadChildren: () => import('src/app/modules/add-sample/add-sample.module').then(m => m.AddSampleModule) },

  { path: 'comodities', loadChildren: () => import('src/app/modules/comodities/comodities.module').then(m => m.ComoditiesModule) },

  { path: 'sample-details/:id', loadChildren: () => import('src/app/modules/user/view-sample/view-sample.module').then(m => m.ViewSampleModule) },

  {
    path: 'my-account',
    loadChildren: () => import('src/app/modules/my-account/my-account.module').then(m => m.MyAccountModule)
  },

  // For Admin
  { path: 'user-requests', loadChildren: () => import('src/app/modules/user-requests/user-request.module').then(m => m.UserRequestsModule) },

  { path: 'sample-requests', loadChildren: () => import('src/app/modules/sample-requests/sample-requests.module').then(m => m.SampleRequestsModule) },

  { path: 'sample-request-details/:id', loadChildren: () => import('src/app/modules/sample-request-details/sample-request.module').then(m => m.SampleRequestDetailsModule) },

  { path: 'create-user', loadChildren: () => import('src/app/modules/user-management/create-user/create-user.module').then(m => m.CreateUserModule) },

  { path: 'update-user/:id', loadChildren: () => import('src/app/modules/user-management/create-user/create-user.module').then(m => m.CreateUserModule) },

  { path: 'create-admin', loadChildren: () => import('src/app/modules/user-management/create-admin/create-admin.module').then(m => m.CreateAdminModule) },

  { path: 'all-users',
  canActivate: [RoleGuard],
  data: {
    requiredRole: 1
  },
   loadChildren: () => import('src/app/modules/user-management/all-user/all-user.module')
   .then(m => m.AllUsersModule) },

  { path: 'user-group', loadChildren: () => import('src/app/modules/user-management/role/role.module').then(m => m.RoleModule) },

  { path: 'user-permissions', loadChildren: () => import('src/app/modules/user-management/permisssion/permission.module').then(m => m.PermissionModule) },

  { path: 'search-sample', loadChildren: () => import('src/app/modules/search-sample/search-sampole.module').then(m => m.SearchSampleModule) },

  { path: 'lab-report', loadChildren: () => import('src/app/modules/lab-report/lab-report.module').then(m => m.LabReportModule) },

  { path: 'settings/client-category', loadChildren: () => import('src/app/modules/setting/category/client-category.module').then(m => m.ClientCategoryModule) },

  { path: 'settings/commodity-category', loadChildren: () => import('src/app/modules/setting/commodity-category/commodity-category.module').then(m => m.CommodityCategoriesModule) },

  { path: 'user-details/:id', loadChildren: () => import('src/app/modules/user-management/view-user/view-user.module').then(m => m.ViewUserDetailsModule) },

  { path: 'commodities-parameter', loadChildren: () => import('src/app/modules/commodities/parameter/parameter.module').then(m => m.ParameterModule) },

  { path: 'commodities-category', loadChildren: () => import('src/app/modules/setting/commodity-category/commodity-category.module').then(m => m.CommodityCategoriesModule) },

  { path: 'commodities', loadChildren: () => import('src/app/modules/commodities/commodities/commodities.module').then(m => m.CommoditiesModule) },

  { path: 'commodities/all-commodities', loadChildren: () => import('src/app/modules/commodities/all/all-commodities.module').then(m => m.AllCommoditiesModule) },

  // Analyst
  { path: 'test-request', loadChildren: () => import('src/app/modules/analyst/test-request/test-request.module').then(m => m.TestRequestModule) },

  { path: 'test-report', loadChildren: () => import('src/app/modules/analyst/test-report/test-report.module').then(m => m.TestReportModule) },

  // Analyst
  { path: 'test-request-details/:id', loadChildren: () => import('src/app/modules/analyst/test-request-details/test-request-details.module').then(m => m.TestRequestDetailsModule) },

  // Access Denied
  { path: 'access-denied', component: ForbiddenComponent },
  // Access Denied

  // Page Not found
  { path: '**', component: PageNotFoundComponent }
  // End Page Not found
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
