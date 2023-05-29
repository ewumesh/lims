import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHandlerDirective } from './status-handler/status-handler';

@NgModule({
  declarations: [StatusHandlerDirective],
  imports: [ CommonModule ],
  exports: [StatusHandlerDirective],
  providers: [],
})
export class SharedModule {}
