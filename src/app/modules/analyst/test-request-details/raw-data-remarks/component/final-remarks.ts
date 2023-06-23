import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './final-remarks.html',
  styleUrls: ['./final-remarks.scss']
})
export class FinalRawDataRemarksComponent implements OnInit {
  responseError = null;
  message: any = {};

  isLoading = false;

  remarksForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private dialogRef: MatDialogRef<FinalRawDataRemarksComponent>
    ) { }

  ngOnInit(): void { }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {

  }
}
