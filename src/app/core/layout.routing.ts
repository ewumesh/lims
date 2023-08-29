import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleGuard } from "../services/role.guard";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found";
import { ForbiddenComponent } from "./components/forbidden/forbidden";
import { NotFoundComponent } from "../components/not-found/404.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,3,4,5,6,7]
    },
    loadChildren: () => import('src/app/modules/dashboard/dashboard.module')
    .then(b => b.DashboardModule)
  },

  // User Routes...
  // Commodity Pricing
  {
    path: 'commodity-pricing',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [5]
    },
    loadChildren: () => import('src/app/modules/user/pricing/pricing.module').
      then(m => m.PricingModule)
  },

  {
    path: 'sample-test-report/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [5]
    },
    loadChildren: () => import('src/app/modules/user/user-report/user-report.module').
      then(m => m.UserReportModule)
  },

  // Users' Added Sample
  {
    path: 'my-sample',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [5]
    },
    loadChildren: () => import('src/app/modules/user/my-sample/my-sample.module')
      .then(m => m.MySampleModule)
  },

  {
    path: 'sample-details/:id',
    data: {
      requiredRole: [5]
    },
    loadChildren: () => import('src/app/modules/user/view-sample/view-sample.module')
    .then(m => m.ViewSampleModule)
  },


  // Users' Added Sample Report
  {
    path: 'report-view',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [5]
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
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/assigned-sample/my-assigned-sample.module').
      then(m => m.MyAssignedSampleModule)
  },

  {
    path: 'lab-sample-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/lab-request-details/lab-request-details.module').
      then(m => m.LabRequestDetailsModule)
  },

  {
    path: 'lab-reports',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/lab-report/lab-report.module').
      then(m => m.LabReportModule)
  },

  // Assigned Samples
  {
    path: 'assigned-sample',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/lab-request/lab-request.module')
      .then(m => m.LabRequestModule)
  },

  // Assigned Sample Details...
  {
    path: 'assigned-sample-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/assigned-sample-details/assigned-sample-details.module')
      .then(m => m.AssignedSampleDetailsModule)
  },
  {
    path: 'sample-report/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/sample-report/sample-report.module')
      .then(m => m.SampleReportModule)
  },

  {
    path: 'sample-report-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/lab-report-details/lab-report-details.module')
      .then(m => m.LabReportDetailsModule)
  },
  // End Supervisor Routes...

  {
    path: 'add-sample',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1, 2, 5, 7]
    },
    loadChildren: () => import('src/app/modules/add-sample/add-sample.module')
      .then(m => m.AddSampleModule)
  },

  {
    path: 'dftqc/licensing/add-sample',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1, 2, 5, 7]
    },
    loadChildren: () => import('src/app/modules/dftqc-samples/add-sample/ap-add-sample.module')
      .then(m => m.ApAddSampleModule)
  },


  {
    path: 'dftqc/licensing/edit-sample/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1, 2, 5, 7]
    },
    loadChildren: () => import('src/app/modules/dftqc-samples/add-sample/ap-add-sample.module')
      .then(m => m.ApAddSampleModule)
  },

  // {
  //   path: 'update-sample/:id',
  //   canActivate: [RoleGuard],
  //   data: {
  //     requiredRole: [1,2, 5,7]
  //   },
  //   loadChildren: () => import('src/app/modules/edit-sample/edit-sample.module')
  //     .then(m => m.EditSampleModule)
  // },

  {
    path: 'update-sample/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2, 5,7]
    },
    loadChildren: () => import('src/app/modules/add-sample/add-sample.module')
      .then(m => m.AddSampleModule)
  },

  {
    path: 'add-sample/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1, 5,7]
    },
    loadChildren: () => import('src/app/modules/add-sample/add-sample.module')
      .then(m => m.AddSampleModule)
  },

  { path: 'comodities', loadChildren: () => import('src/app/modules/comodities/comodities.module').then(m => m.ComoditiesModule) },

  {
    path: 'my-account',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,3,4,5,6,7]
    },
    loadChildren: () => import('src/app/modules/my-account/my-account.module').then(m => m.MyAccountModule)
  },

  // For Admin
  {
    path: 'user-requests',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/user-requests/user-request.module')
    .then(m => m.UserRequestsModule)
  },

  {
    path: 'sample-requests',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1, 2,7]
    },
    loadChildren: () => import('src/app/modules/sample-requests/sample-requests.module')
    .then(m => m.SampleRequestsModule)
  },

  {
    path: 'sample-request-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/sample-request-details/sample-request.module')
    .then(m => m.SampleRequestDetailsModule)
  },

  {
    path: 'create-user',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1, 2,7]
    },
    loadChildren: () => import('src/app/modules/user-management/create-user/create-user.module')
    .then(m => m.CreateUserModule)
  },

  {
    path: 'update-user/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/user-management/create-user/create-user.module')
    .then(m => m.CreateUserModule)
  },

  {
    path: 'update-admin/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/user-management/create-admin/create-admin.module')
    .then(m => m.CreateAdminModule)
  },

  {
    path: 'create-admin',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,7]
    },
    loadChildren: () => import('src/app/modules/user-management/create-admin/create-admin.module')
    .then(m => m.CreateAdminModule)
  },

  {
    path: 'all-users',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/user-management/all-user/all-user.module')
      .then(m => m.AllUsersModule)
  },

  {
    path: 'user-group',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,7]
    },
    loadChildren: () => import('src/app/modules/user-management/role/role.module')
    .then(m => m.RoleModule)
  },

  {
    path: 'user-permissions',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,7]
    },
    loadChildren: () => import('src/app/modules/user-management/permisssion/permission.module').
    then(m => m.PermissionModule)
  },

  {
    path: 'search-sample',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,7]
    },
    loadChildren: () => import('src/app/modules/search-sample/search-sampole.module')
    .then(m => m.SearchSampleModule)
  },

  {
    path: 'lab-report',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,3,4,5,6,7]
    },
    loadChildren: () => import('src/app/modules/lab-report/lab-report.module')
    .then(m => m.LabReportModule)
  },  
  
  {
    path: 'supervisor-lab-report',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/supervisor-report/supervisor-report.module')
    .then(m => m.SupervisorReportModule)
  },

  {
    path: 'supervisor-lab-report-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [3]
    },
    loadChildren: () => import('src/app/modules/supervisor/supervisor-report-view/supervisor-report-view.module')
    .then(m => m.SupervisorSampleReportViewModule)
  },

  {
    path: 'settings/client-category',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/setting/category/client-category.module')
    .then(m => m.ClientCategoryModule)
  },

  {
    path: 'settings/commodity-category',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1, 2,7]
    },
    loadChildren: () => import('src/app/modules/setting/commodity-category/commodity-category.module')
    .then(m => m.CommodityCategoriesModule)
  },

  {
    path: 'user-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,3,7]
    },
    loadChildren: () => import('src/app/modules/user-management/view-user/view-user.module')
    .then(m => m.ViewUserDetailsModule)
  },

  {
    path: 'commodities-parameter',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/commodities/parameter/parameter.module')
    .then(m => m.ParameterModule)
  },

  {
    path: 'add/commodities-parameter',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/commodities/commodities/add-parameter/add-parameter.module')
    .then(m => m.AddParameterModule)
  },

  {
    path: 'edit/commodities-parameter/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/commodities/edit-parameter/edit-parameter.module')
    .then(m => m.EditParameterModule)
  },

  {
    path: 'commodities-category',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,7]
    },
    loadChildren: () => import('src/app/modules/setting/commodity-category/commodity-category.module')
    .then(m => m.CommodityCategoriesModule)
  },

  {
    path: 'commodities',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,3,4,7]
    },
    loadChildren: () => import('src/app/modules/commodities/commodities/commodities.module')
    .then(m => m.CommoditiesModule)
  },

  {
    path: 'commodities/all-commodities',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1, 2,3,4,7]
    },
    loadChildren: () => import('src/app/modules/commodities/all/all-commodities.module')
    .then(m => m.AllCommoditiesModule)
  },

  // Analyst
  {
    path: 'test-request',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [4]
    },
    loadChildren: () => import('src/app/modules/analyst/test-request/test-request.module')
      .then(m => m.TestRequestModule)
  },

  {
    path: 'raw-data-sheet',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [4]
    },
    loadChildren: () => import('src/app/modules/analyst/raw-data/raw-data.module')
      .then(m => m.RawDataModule)
  },

  {
    path: 'test-report',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [4]
    },
    loadChildren: () => import('src/app/modules/analyst/test-report/test-report.module')
      .then(m => m.TestReportModule)
  },

  // Analyst
  {
    path: 'test-request-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [4]
    },
    loadChildren: () => import('src/app/modules/analyst/test-request-details/test-request-details.module')
      .then(m => m.TestRequestDetailsModule)
  },

  // Verifier
  {
    path: 'sample-verify',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [6]
    },
    loadChildren: () => import('src/app/modules/verifier/sample-verify/sample-verify.module')
      .then(m => m.SampleVerifyModule)
  },

  {
    path: 'sample-verify-details/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [6]
    },
    loadChildren: () => import('src/app/modules/verifier/sample-verify-details/sample-verify-details.module')
      .then(m => m.SampleVerifyDetailsModule)
  },

  {
    path: 'verify-report',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [6]
    },
    loadChildren: () => import('src/app/modules/verifier/verify-report/verify-report.module')
      .then(m => m.VerifyReportModule)
  },

  {
    path: 'verify-sample-report/:id',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [6]
    },
    loadChildren: () => import('src/app/modules/verifier/verify-sample-report/verify-sample-report.module')
      .then(m => m.VerifySampleReportModule)
  },

  {
    path: 'final-report/:id',
    loadChildren: () => import('src/app/modules/lab-report-details/final-lab-report.module')
      .then(m => m.FinalLabReportModule)
  },

  {
    path: 'track-sample',
    loadChildren: () => import('src/app/modules/track-sample/track-sample.module')
      .then(m => m.TrackSampleModule)
  },  

  {
    path: 'admin-sample-request',
    loadChildren: () => import('src/app/modules/admin-sample-request/admin-sample-request.module')
      .then(m => m.AdminSampleRequestModule)
  },

  {
    path: 'admin-sample-request-details/:id',
    loadChildren: () => import('src/app/modules/admin-sample-request-details/admin-sample-request-details.module')
      .then(m => m.AdminSampleRequestDetailModule)
  },

  {
    path: 'track-sample-details/:id',
    loadChildren: () => import('src/app/modules/track-sample-details/track-sample-details.module')
      .then(m => m.TrackSampleDetailsModule)
  },

  {
    path: 'sample-assigned',
    loadChildren: () => import('src/app/modules/assigned-sample-admin/assigned-sample-admin.module')
      .then(m => m.AssignedSampleAdminModule)
  },

  {
    path: 'sample-assigned-details/:id',
    loadChildren: () => import('src/app/modules/assigned-sample-admin-details/assigned-sample-admin-details.module')
      .then(m => m.AssignedSampleAdminDetailsModule)
  },

  {
    path: 'report/:id',
    // canActivate: [RoleGuard],
    // data: {
    //   requiredRole: [1]
    // },
    loadChildren: () => import('src/app/modules/final-report-view/final-report-view.module')
      .then(m => m.FinalReportViewModule)
  },

  {
    path: 'fiscal-year',
    canActivate: [RoleGuard],
    data: {
      requiredRole: [1,2,3,4,5,6, 7]
    },
    loadChildren: () => import('../modules/setting/fiscal-year/fiscal-year.module')
      .then(m => m.FiscalYearModule)
  },


  // Access Denied
  { path: 'access-denied', component: ForbiddenComponent },
  // Access Denied

  // Page Not found
  { path: '**', component: PageNotFoundComponent  }
  // End Page Not found
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
