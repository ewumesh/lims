import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSampleComponent } from './view-sample.component';
import { RouterModule } from '@angular/router';
import { ViewSampleService } from 'src/app/services/user/view-sample/view-sample.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewPaymentReceiptComponent } from './view-payment-receipt/view-payment-receipt';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ViewSampleComponent,ViewPaymentReceiptComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ViewSampleComponent}
    ]),
    MatDialogModule,
    SharedModule
   ],
  exports: [],
  providers: [ViewSampleService],
})
export class ViewSampleModule {}
