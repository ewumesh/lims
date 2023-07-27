import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRequestDetailsComponent } from './test-request-details.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DeleteConfirmModule } from 'src/app/shared/delete-confirm/delete-confirm.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TestRequestDetailsService } from 'src/app/services/analyst/test-request-details/test-request-details.service';
import { CalculateComponent } from './calculate/calculate.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AnalystRemarksComponent } from './remarks/analyst-remarks';
import { SharedModule } from 'src/app/shared/shared.module';
import { RawDataRemarksComponent } from './raw-data-remarks/raw-data-remarks';
import { FinalRawDataRemarksComponent } from './raw-data-remarks/component/final-remarks';
import { ViewRawDataComponent } from './view-raw-data/view-raw-data';
import { ViewRemarksComponent } from './view-remarks/view-remarks';
import { MicroParameterDetailsComponent } from './parameter-details/micro-parameter-details';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewMicroRawDataComponent } from './view-micro-raw-data/view-micro-raw-data';
import {MatTabsModule} from '@angular/material/tabs';
import { GenerateMicroRawDataComponent } from './generate-micro-raw-data/generate-micro-raw-data';

@NgModule({
  declarations: [
    TestRequestDetailsComponent,
    CalculateComponent,
    AnalystRemarksComponent,
    RawDataRemarksComponent,
    FinalRawDataRemarksComponent,
    ViewRawDataComponent,
    ViewRemarksComponent,
    MicroParameterDetailsComponent,
    ViewMicroRawDataComponent,
    GenerateMicroRawDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TestRequestDetailsComponent}
    ]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,

    DeleteConfirmModule,
    SharedModule
   ],
  exports: [],
  providers: [TestRequestDetailsService],
})
export class TestRequestDetailsModule {}
