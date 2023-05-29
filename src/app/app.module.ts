import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
/* Custom components */
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app.routing';
import { ToastComponent } from './shared/toastr/toastr.component';
import { ToastService } from './shared/toastr/toastr.service';
import { AuthGuard } from './services/auth.guard';
import { JwtInterceptor } from './services/token-interceptor';
import { NotFoundComponent } from './components/not-found/404.component';

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
    AppRoutingModule

  ],
  exports: [MatMenuModule],
  providers: [
    // AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
