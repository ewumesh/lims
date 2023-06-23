import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawDataComponent } from './raw-data.component';
import { RawDataService } from 'src/app/services/analyst/raw-data/raw-data.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RawDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: RawDataComponent}
    ])
   ],
  exports: [],
  providers: [RawDataService],
})
export class RawDataModule {}
