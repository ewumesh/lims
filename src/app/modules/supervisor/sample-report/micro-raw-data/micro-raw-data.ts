import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ViewMicroRawDataComponent } from "src/app/modules/analyst/test-request-details/view-micro-raw-data/view-micro-raw-data";



@Component({
    templateUrl:'./micro-raw-data.html',
    styleUrls:['./micro-raw-data.scss']
})

export class MicroRawDataComponent {

    constructor(
        private dialogRef: MatDialogRef<MicroRawDataComponent>,
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