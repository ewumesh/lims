import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
        private toast: ToastService
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
        let status = 'recheck';
        let id = 7;
        this.service.sendForRecheck(status, id).subscribe(res => {
            this.toast.showToast(TOAST_STATE.success, 'Success')
        })
    }

}