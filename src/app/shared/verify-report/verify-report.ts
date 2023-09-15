import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { ViewVieriferRemarks } from './view-remarks/view-remarks';
import { MicroRawDataVerifierComponent } from './view-micro-raw/micro-raw-data-verifier';
import { VerifyLabSheetComponent } from './lab-shhet/labsheet';
import NepaliDate from 'nepali-datetime';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateFormatter } from 'angular-nepali-datepicker';
import { TOAST_STATE, ToastService } from '../toastr/toastr.service';
@Component({
  selector: 'verify-report',
  templateUrl: './verify-report.html',
  styleUrls: ['./verify-report.scss'],
})
export class VerifyReportComponent implements OnInit {
  status = 'pending';
  @Input() reportDetails;

  @Input() rawDataSheet;

  userDetails: any;

  clientCategories: any[] = [];

  SampleTypes: any[] = [
    { id: 1, name: 'liquid' },
    { id: 11, name: 'solid' },
  ];

  isEdit = false;

  partialSampleForm: FormGroup;

  constructor(
    private service: SampleReportService,
    private pipe: DatePipe,
    private dialog: MatDialog,
    private fb: FormBuilder,

    private toast: ToastService,
  ) {}

  editSample() {
    this.isEdit = true;
  }

  cancel() {
    this.isEdit = false;
  }

  initForm() {
    this.partialSampleForm = this.fb.group({
      name: [''],
      // commodity: [''],
      mfd: [null],
      dfb: [''],
      batch: [''],
      brand: [''],
      purpose: ['', Validators.required],
      condition: [''],
      amendments: [''],
      note: [''],

      sample_type: [''],
      sample_quantity: [''],
      sample_units: '',
      number_of_sample: '',

      dfb_type: 'date',
      dfb_duration: '',
      days_dfb: '',
    })
  }

  setUnits() {
    this.partialSampleForm.get('sample_type').valueChanges.subscribe(a => {
      if (a === 'liquid') {
        this.partialSampleForm.get('sample_units').setValue('ml');
      } else if (a === 'solid') {
        this.partialSampleForm.get('sample_units').setValue('gm');
      }
    })
  }

  

  formatter: DateFormatter = (date) => {
    let month;
    let days;
    if(date.month < 10) {
        month = '0' + (date.month+1).toString();
    } else {
        month = date.month;
    }

    if(date.day < 10) {
        days = '0' + (date.day).toString();
    } else {
        days = date.day;
    }
    return `${date.year}-${month}-${days}`;
    // return `${date.year} साल, ${date.month + 1} महिना, ${date.day} गते`;
  } 

  ngOnInit(): void {
    this.getUserDetails();
    this.getClientCategories();
    this.initForm();

    this.setUnits();
    this.patchForm();
    // console.log(this.reportDetails, 'REPORT DETAILS...')
  }

  patchForm() {

    const mfdString = this.reportDetails?.mfd.split('-');
    let dfbString
    if(this.reportDetails?.dfb) {
      dfbString = this.reportDetails?.dfb.split('-');
    } else {
      dfbString = ''
    }

    let mfd: any = {};
    let dfb: any = {};

    if (mfdString.length === 3) {
      mfd.year = parseInt(mfdString[0], 10);
      mfd.month = parseInt(mfdString[1], 10);
      mfd.day = parseInt(mfdString[2], 10);
    } else {}

    if (dfbString && dfbString.length === 3) {
      dfb.year = parseInt(mfdString[0], 10);
      dfb.month = parseInt(mfdString[1], 10);
      dfb.day = parseInt(mfdString[2], 10);
    } else {
      dfb = ''
    }

    this.partialSampleForm.patchValue({
      id: this.reportDetails?.id,
      name: this.reportDetails?.name,
      // commodity: this.reportDetails?.commodity?.name,
      mfd: mfd,
      dfb: dfb,
      batch: this.reportDetails?.batch,
      brand: this.reportDetails?.brand,
      purpose: this.reportDetails?.purpose,
      condition: this.reportDetails?.condition,
      amendments: this.reportDetails?.amendments,
      note: this.reportDetails?.note,

      sample_type: this.reportDetails?.sample_type,
      sample_quantity: this.reportDetails?.sample_quantity,
      sample_units: this.reportDetails?.sample_units,
      number_of_sample: this.reportDetails?.number_of_sample,


      dfb_type: this.reportDetails?.dfb_type,
      dfb_duration: this.reportDetails?.dfb_duration,
      days_dfb: this.reportDetails?.days_dfb
    })
  }


  updateSampleDetails() {

    let formValue = this.partialSampleForm.value;

    if (this.partialSampleForm.value.mfd) {
      formValue.mfd = this.formatter(this.partialSampleForm.value.mfd)
    } else {
      formValue.mfd = '';
    }

    if (this.partialSampleForm.value.dfb) {
      formValue.mfd = this.formatter(this.partialSampleForm.value.dfb)
    } else {
      formValue.dfb = '';
    }
    
    this.service.updateSample(this.partialSampleForm.value, this.reportDetails?.id).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, res.message);
      this.dismissToast();
      this.isEdit = false;
    })
  }

  dismissToast() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2000)
  }

  getClientCategories() {
    this.service.getCategories().subscribe((res) => {
      this.clientCategories = res.results;
    });
  }

  viewLabSheet(data?) {
    this.dialog.open(VerifyLabSheetComponent, {
      data: data,
      height: '80vh',
    });
  }

  convertToNepaliDate(enDate) {
    let nepDate: any = {};
    const eng = enDate.split('-');
    let time = this.pipe.transform(enDate, 'hh:mm:ss');
    nepDate.year = parseInt(eng[0], 10);
    nepDate.month = parseInt(eng[1], 10);
    nepDate.day = parseInt(eng[2], 10);
    nepDate.hour = Number(time.slice(0, 2));
    nepDate.minute = Number(time.slice(3, 5));
    let npDate = NepaliDate.fromEnglishDate(
      nepDate.year,
      nepDate.month,
      nepDate.day,
      16,
      37
    );
    return `${npDate.year}-${npDate.month}-${npDate.day}`;
  }

  getClientCategoryName(id) {
    return this.clientCategories.find((a) => a.id === id)?.name;
  }

  getUserDetails() {
    this.service
      .getUserDetails(this.reportDetails?.owner_user?.id)
      .subscribe((res) => {
        this.userDetails = res;
      });
  }

  viewRemarks(data, user) {
    if (user === 'analyst') {
    } else {
      data.remarks = data.supervisor_remarks;
    }

    this.dialog.open(ViewVieriferRemarks, {
      data: data,
    });
  }

  downloadRawDatasheet(id) {
    this.service.downloadRawData(id);
  }

  printRawData(id) {
    this.service.printRawData(id);
  }  
  
  downloadRawDatasheetM(id) {
    this.service.downloadMicroRawData(id);
  }

  printRawDataM(id) {
    this.service.printMicroRawData(id);
  }

  viewMicroRawData(a) {
    let instance: MatDialogRef<MicroRawDataVerifierComponent, any>;

    instance = this.dialog.open(MicroRawDataVerifierComponent, {
      data: a,
    });
  }
}
