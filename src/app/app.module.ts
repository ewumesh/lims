import { LanguageService } from './services/language-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
/* Custom components */
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app.routing';
import { ToastComponent } from './shared/toastr/toastr.component';
import { ToastService } from './shared/toastr/toastr.service';
import { AuthGuard } from './services/auth.guard';
import { JwtInterceptor } from './services/token-interceptor';
import { NotFoundComponent } from './components/not-found/404.component';
import { TokenInterceptor } from './services/token-validator';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { SharedService } from './services/shared/shared.service';
import { UserVerificationSuccessComponent } from './components/email-verification-success/email-verification-success';
import { SuperscriptPipe } from './shared/s-transform';
import { TruncatePipe } from './shared/truncate/truncate.pipe';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    NotFoundComponent,
    EmailVerificationComponent,
    UserVerificationSuccessComponent,
    // SuperscriptPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatBottomSheetModule,

    // Custom Modules
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CKEditorModule,
  ],
  exports: [MatMenuModule, MatBottomSheetModule],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ToastService,
    LanguageService,
    SharedService,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
