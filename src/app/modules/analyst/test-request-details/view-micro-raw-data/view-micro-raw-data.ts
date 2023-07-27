import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: './view-micro-raw-data.html',
    styleUrls: ['./view-micro-raw-data.scss']
})

export class ViewMicroRawDataComponent {

    constructor(
        private dialogRef: MatDialogRef<ViewMicroRawDataComponent>,
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