import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManualComponent } from './user-manual.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', component: UserManualComponent}
    ])
  ],
  declarations: [UserManualComponent]
})
export class UserManualModule { }
