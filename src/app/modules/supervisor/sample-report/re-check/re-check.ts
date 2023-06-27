import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { response } from 'express';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { ToastService, TOAST_STATE } from 'src/app/shared/toastr/toastr.service';

@Component({
    templateUrl: './re-check.html',
    styleUrls: ['./re-check.scss']
})

export class ReCheckComponent implements OnInit {
    recheckForm: FormGroup;

    message: any = {};

    responseError = null;

    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ReCheckComponent>,
        private router: Router,
        private service: SampleReportService,
        private toast: ToastService,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.recheckForm = this.fb.group({
            remarks: ''
        })
    }

    closeDialog() {
        this.dialogRef.close();
    }

    submit() {
        
        let payload = this.data;
        payload.remarks = this.recheckForm.value.remarks; 
        this.service.sendForRecheck(payload).subscribe(res => {
            this.toast.showToast(TOAST_STATE.success, res.message);
            this.dialogRef.close();
            this.dismissMessage();
        },)
    }

    dismissMessage() {
        setTimeout(() => {
            this.toast.dismissToast();
        }, 2000);
    }

}