import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ViewMicroRawDataComponent } from "../view-micro-raw-data/view-micro-raw-data";

@Component({
    templateUrl: './generate-micro-raw-data.html',
    styleUrls:['./generate.scss']
})

export class GenerateMicroRawDataComponent {
    constructor(
        private dialogRef: MatDialogRef<GenerateMicroRawDataComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any
    ) { 
    }

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