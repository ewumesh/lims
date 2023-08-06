import { LanguageService } from './services/language-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
/* Custom components */
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app.routing';
import { ToastComponent } from './shared/toastr/toastr.component';
import { ToastService } from './shared/toastr/toastr.service';
import { AuthGuard } from './services/auth.guard';
import { JwtInterceptor } from './services/token-interceptor';
import { NotFoundComponent } from './components/not-found/404.component';
import { TokenInterceptor } from './services/token-validator';

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    NotFoundComponent
    ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,

    // Custom Modules
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule

  ],
  exports: [MatMenuModule],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ToastService,
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
