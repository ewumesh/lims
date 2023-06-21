import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/not-found/404.component'

const routes: Routes = [
  { path: 'commodity-pricing', canActivate: [AuthGuard], loadChildren: () => import('src/app/modules/user-pricing/user-pricing.module').then(b => b.UserPricingModule) },
  { path: 'login', canActivate: [AuthGuard], loadChildren: () => import('src/app/modules/login/login.module').then(b => b.LoginModule) },
  { path: 'register', canActivate: [AuthGuard], loadChildren: () => import('src/app/modules/register/register.module').then(b => b.RegisterModule) },
  { path: 'forgot-password', canActivate: [AuthGuard], loadChildren: () => import('src/app/modules/forgot-password/forgot-password.module').then(b => b.ForgotPasswordModule) },
  { path: 'password-reset', canActivate: [AuthGuard], loadChildren: () => import('src/app/modules/password-reset/password-reset.module').then(b => b.PasswordResetModule) },
  {
    path: 'dashboard', component: LayoutComponent, children: [
      { path: '', loadChildren: () => import('src/app/core/layout.module').then(b => b.LayoutModule) }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent },
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
