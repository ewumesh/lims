import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl: './view-raw-data.html',
    styleUrls: ['./view-raw-data.scss']
})

export class SupervisorViewRawDataComponent implements OnInit {

    rawDatasheetDetails: any

    constructor(
        private dialogRef: MatDialogRef<SupervisorViewRawDataComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
    ) { 
        console.log(this.data, 'MY DATA...')
    }

    ngOnInit(): void {

    }

    splitStringByComma(input: string): string[] {
        const result: string[] = input?.split(',');
        return result;
    }

    parseJSON(data) {
        console.log(JSON.parse(data), 'oi')
        return JSON.parse(data);
    }

    closeDialog() {
        this.dialogRef.close();
    }

}