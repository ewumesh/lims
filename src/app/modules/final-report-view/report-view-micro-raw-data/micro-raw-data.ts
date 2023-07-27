import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";



@Component({
    templateUrl: './micro-raw-data.html',

    styleUrls:['./micro-raw-data.scss']
})


export class ReportMicroRawDataComponent {
    constructor(
        private dialogRef: MatDialogRef<ReportMicroRawDataComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any
    ) { }

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