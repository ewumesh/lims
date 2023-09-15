import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHandlerDirective } from './status-handler/status-handler';
import { SuperscriptPipe } from './s-transform';
import { TruncatePipe } from './truncate/truncate.pipe';

@NgModule({
  declarations: [StatusHandlerDirective, SuperscriptPipe],
  imports: [CommonModule],
  exports: [StatusHandlerDirective, SuperscriptPipe],
  providers: [],
})
export class SharedModule {}
