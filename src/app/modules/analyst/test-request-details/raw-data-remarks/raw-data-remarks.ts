import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toastr/toastr.service';
import { FinalRawDataRemarksComponent } from './component/final-remarks';
import { TestRequestDetailsService } from 'src/app/services/analyst/test-request-details/test-request-details.service';

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastService,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<RawDataRemarksComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private service: TestRequestDetailsService
    ) {
    }

  ngOnInit(): void {
    this.initForm();
    this.getRawDatasheetDetails();
  }

  splitStringByComma(input: string): string[] {
    const result: string[] = input?.split(',');
    return result;
  }

  getRawDatasheetDetails() {
    this.service.getRawDataSheetDetails(this.data.id).subscribe(res => {
      this.rawDatasheetDetails = res;
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
