import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: './print-sample.component.html',
    styleUrls: ['./print-sample.scss']
})

export class PrintSampleDetailsComponent {


    constructor(
        private dialogRef: MatDialogRef<PrintSampleDetailsComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any) {
    }

}