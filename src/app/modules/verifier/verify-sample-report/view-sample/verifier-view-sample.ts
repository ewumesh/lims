import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
    templateUrl:'./verifier-view-sample.html',
    styleUrls:['./verifier-view-sample.scss']
})

export class VerifierReportComponent {
    constructor(
        private dialogRef: MatDialogRef<VerifierReportComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data: any,
    ) {
        console.log(data, 'ADDJKHBV')
    }
}