import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl:'./s-verify.html'
})
export class VerificationComponent implements OnInit {
  remarksForm: FormGroup;
  message:any = {}
  responseError = null;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<VerificationComponent>,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm () {
    this.remarksForm = this.fb.group({
      remarks: ['', Validators.required]
    })
  }
  submit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
