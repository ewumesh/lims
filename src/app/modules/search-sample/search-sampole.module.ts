import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSampleComponent } from './search-sample.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchSampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SearchSampleComponent}
    ])
   ],
  exports: [],
  providers: [],
})
export class SearchSampleModule {}
