import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/not-found/404.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { UserVerificationSuccessComponent } from './components/email-verification-success/email-verification-success';

const routes: Routes = [
  {
    path: 'complain',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/complain/complain.module').then(
        (b) => b.ComplainModule
      ),
  },
  {
    path: 'feedback',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/feedback/feedback.module').then(
        (b) => b.FeedbackModule
      ),
  },
  {
    path: 'user-manual',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/manual/user-manual/user-manual.module').then(
        (b) => b.UserManualModule
      ),
  },
  {
    path: 'video-manual',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/manual/video-manual/video-manual.module').then(
        (b) => b.VideoManualModule
      ),
  },

  {
    path: 'commodity-pricing',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/user-pricing/user-pricing.module').then(
        (b) => b.UserPricingModule
      ),
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/login/login.module').then((b) => b.LoginModule),
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/register/register.module').then(
        (b) => b.RegisterModule
      ),
  },
  {
    path: 'forgot-password',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/forgot-password/forgot-password.module').then(
        (b) => b.ForgotPasswordModule
      ),
  },
  {
    path: 'password-reset',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/password-reset/password-reset.module').then(
        (b) => b.PasswordResetModule
      ),
  },

  { path: 'user-verification', component: EmailVerificationComponent },
  {
    path: 'user-verification-success',
    component: UserVerificationSuccessComponent,
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/core/layout.module').then((b) => b.LayoutModule),
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
