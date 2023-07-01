import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManualComponent } from './user-manual.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', component: UserManualComponent}
    ]),
    MatMenuModule
  ],
  declarations: [UserManualComponent]
})
export class UserManualModule { }
