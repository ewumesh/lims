import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestRequestComponent } from './test-request.component';

@NgModule({
  declarations: [TestRequestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TestRequestComponent}
    ])

   ],
  exports: [],
  providers: [],
})
export class TestRequestModule {}
