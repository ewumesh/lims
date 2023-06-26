import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    templateUrl: './re-check.html',
    styleUrls: ['./re-check.scss']
})

export class ReCheckComponent implements OnInit {
    recheckForm: FormGroup;

    message:any = {};

    responseError = null;

    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ReCheckComponent>,
        private router: Router
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
            
        }

}