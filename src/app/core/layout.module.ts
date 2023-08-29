import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';
import { SharedService } from '../services/shared/shared.service';
import { LayoutService } from './layout.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found';
import { RoleGuard } from '../services/role.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden';
import { LayoutRoutingModule } from './layout.routing';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ViewImageComponent } from '../modules/my-account/view-image/view-image';
import {MatListModule} from '@angular/material/list';
import { AvatarModule } from 'ngx-avatar';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CdkAccordionOverviewExample } from './sidebar/dropdown.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {MatToolbarModule} from '@angular/material/toolbar';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    NotificationComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    ViewImageComponent,CdkAccordionOverviewExample
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule,
    LayoutRoutingModule,
    MatListModule,
    CdkAccordionModule,
    AvatarModule,
    MatExpansionModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatSidenavModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })

  ],
  exports: [],
  providers: [
    SharedService, 
    LayoutService,
    // { provide: MatBottomSheetRef, useValue: {} },
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class LayoutModule { }
