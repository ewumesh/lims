import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestsComponent } from './user-request.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'src/app/shared/table/table.module';

@NgModule({
  declarations: [UserRequestsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: UserRequestsComponent}
    ]),
    TableModule
  ],
  exports: [],
  providers: [],
})
export class UserRequestsModule {}
