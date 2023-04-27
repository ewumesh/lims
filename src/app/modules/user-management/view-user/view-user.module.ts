import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';

import { ViewUserDetailsComponent } from './view-user.component';
import { ViewUserDetailsService } from 'src/app/services/user-management/view-user/view-user.service';

@NgModule({
  declarations: [
    ViewUserDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ViewUserDetailsComponent}
    ]),
    MatChipsModule
   ],
  exports: [],
  providers: [ViewUserDetailsService],
})
export class ViewUserDetailsModule {}
