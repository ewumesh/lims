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
import { LabSheetComponent } from './lab-sheet/lab-sheet';
import { SuperscriptPipe } from 'src/app/shared/s-transform';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

export const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS',
  },
  display: {
    dateInput: 'ddd D MMM YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
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
    GenerateMicroRawDataComponent,
    LabSheetComponent,
    SuperscriptPipe
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
    SharedModule,
    CKEditorModule,
    AngularEditorModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
    
   ],
  exports: [],
  providers: [TestRequestDetailsService,{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
  // providers: [TestRequestDetailsService],
})
export class TestRequestDetailsModule {}
