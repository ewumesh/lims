import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ViewMicroRawDataComponent } from "src/app/modules/analyst/test-request-details/view-micro-raw-data/view-micro-raw-data";

@Component({
    templateUrl:'./micro-raw-data-verifier.html',
    styleUrls:['./micro-raw-data-verifier.scss']
})


export class MicroRawDataVerifierComponent {
    constructor(
        private dialogRef: MatDialogRef<MicroRawDataVerifierComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any
    ) {}

    closeDialog() {
        this.dialogRef.close();
    }

    splitStringByComma(input: string): string[] {
        const result: string[] = input?.split(',');
        return result;
      }
    
      parseJSON(data) {
        // console.log(JSON.parse(data), 'oi')
        return JSON.parse(data);
      }
}