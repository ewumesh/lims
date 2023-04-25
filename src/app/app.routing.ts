import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', canActivate: [AuthGuard], loadChildren: () => import('src/app/modules/login/login.module').then(b => b.LoginModule) },
  { path: 'register', canActivate: [AuthGuard], loadChildren: () => import('src/app/modules/register/register.module').then(b => b.RegisterModule) },
  { path: 'forgot-password', canActivate: [AuthGuard], loadChildren: () => import('src/app/modules/forgot-password/forgot-password.module').then(b => b.ForgotPasswordModule) },
  {
    path: 'dashboard', component: LayoutComponent, children: [
      { path: '', loadChildren: () => import('src/app/core/layout.module').then(b => b.LayoutModule) }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
