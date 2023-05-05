import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from 'src/app/services/account/account.service';
import { AvatarModule } from 'ngx-avatar';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MyAccountComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    AvatarModule,
    MatSelectModule,
    MatChipsModule
   ],
  exports: [],
  providers: [AccountService],
})
export class MyAccountModule {}
