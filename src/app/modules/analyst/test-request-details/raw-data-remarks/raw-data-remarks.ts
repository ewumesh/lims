import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toastr/toastr.service';
import { FinalRawDataRemarksComponent } from './component/final-remarks';
import { TestRequestDetailsService } from 'src/app/services/analyst/test-request-details/test-request-details.service';

// import NepaliDate from 'nepali-date-converter';
import  NepaliDate from 'nepali-datetime'
import { DatePipe } from '@angular/common';
@Component({
  templateUrl: './raw-data-remarks.html',
  styleUrls: ['./raw-data-remarks.scss']
})
export class RawDataRemarksComponent implements OnInit {

  remarksForm: FormGroup;
  message: any = {};
  isLoading = false;

  responseError = null;

  rawDatasheetDetails: any;

  selected = new FormControl(0);

  microParameterDetails:any;

  microTableId =0;

  today;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastService,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<RawDataRemarksComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private service: TestRequestDetailsService,
    private datePipe: DatePipe
    ) {

      this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

      // const date1 = new NepaliDate();

      // const date3 = NepaliDate.fromEnglishDate(2023, 8, 30)
      // console.log(date3, 'a')
    }

    convertToNepaliDate(enDate) {


      let nepDate:any = {};
      const eng = enDate.split('-');
      let time = this.datePipe.transform(enDate, 'hh:mm:ss');
      nepDate.year = parseInt(eng[0], 10);
      nepDate.month = parseInt(eng[1], 10);
      nepDate.day = parseInt(eng[2], 10);
      nepDate.hour = Number(time.slice(0,2));
      nepDate.minute = Number(time.slice(3,5));
      let npDate = NepaliDate.fromEnglishDate(nepDate.year, nepDate.month-1, nepDate.day, nepDate.hour, nepDate.minute, 0);
      return `${npDate.year}-${npDate.month+1}-${npDate.day}`;
    }

  ngOnInit(): void {
    this.initForm();
    this.getRawDatasheetDetails();
  }

  tabChange(e) {

    this.microTableId = e.micro_table;
    this.getMicroParametersDetails();
  }

  parseJSON(data?) {
    return JSON.parse(data);
  }

  splitStringByComma(input: string): string[] {
    const result: string[] = input?.split(',');
    return result;
  }

  getRawDatasheetDetails() {
    this.service.getRawDataSheetDetails(this.data.id).subscribe(res => {
      this.rawDatasheetDetails = res;

      this.microTableId = this.rawDatasheetDetails?.parameter[0]?.micro_table;
      this.getMicroParametersDetails();
    }) 
  }

  getMicroParametersDetails() {
    let payload = {
      id: this.microTableId
    }
    this.service.getMicroParameterDetails(payload).subscribe(res => {
      this.microParameterDetails = res;
    })
  }

  initForm() {
    this.remarksForm = this.fb.group({
      remarks: ''
    })
  }

  download() {

  }

  procceed() {
    this.dialog.open(FinalRawDataRemarksComponent, {
      data: this.data
    })
  }


  closeDialog() {
    this.dialogRef.close();
  }

  generate() {
    this.router.navigate(['/dashboard/raw-data-sheet']);
    this.dialogRef.close();
  }


}
