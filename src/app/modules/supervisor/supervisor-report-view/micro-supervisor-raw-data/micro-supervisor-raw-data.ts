import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    templateUrl: './micro-supervisor-raw-data.html',
    styleUrls: ['./micro-supervisor-raw-data.scss']
})


export class MicroSupervisorRawDataComponent {

    constructor(
        private dialogRef: MatDialogRef<MicroSupervisorRawDataComponent>,
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
        return JSON.parse(data);
    }
}