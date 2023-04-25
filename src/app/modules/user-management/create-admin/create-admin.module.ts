import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAdminComponent } from './create-admin.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ' ', component: CreateAdminComponent }
    ])
  ],
  exports: [],
  providers: [],
})
export class CreateAdminModule { }
