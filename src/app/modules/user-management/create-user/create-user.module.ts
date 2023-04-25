import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './create-user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component:CreateUserComponent}
    ])
   ],
  exports: [],
  providers: [],
})
export class CreateUserModule {}
