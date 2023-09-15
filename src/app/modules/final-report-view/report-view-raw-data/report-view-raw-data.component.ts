import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import  NepaliDate from 'nepali-datetime'

@Component({
    templateUrl: './report-view-raw-data.component.html',
    styleUrls: ['./report-view-raw-data.scss']
})

export class ReportViewRawDataComponent implements OnInit {

    rawDatasheetDetails: any

    constructor(
        private dialogRef: MatDialogRef<ReportViewRawDataComponent>,
        private pipe: DatePipe,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
    ) { 
        // console.log(this.data, 'MY DATA...')
    }

    convertToNepaliDate(enDate) {
        let nepDate:any = {};
        const eng = enDate.split('-');
        let time = this.pipe.transform(enDate, 'hh:mm:ss');
        nepDate.year = parseInt(eng[0], 10);
        nepDate.month = parseInt(eng[1], 10);
        nepDate.day = parseInt(eng[2], 10);
        nepDate.hour = Number(time.slice(0,2));
        nepDate.minute = Number(time.slice(3,5));
        let npDate = NepaliDate.fromEnglishDate(nepDate.year, nepDate.month-1, nepDate.day, nepDate.hour, nepDate.minute, 0);
        return `${npDate.year}-${npDate.month+1}-${npDate.day}`;
      }

    ngOnInit(): void {

    }

    splitStringByComma(input: string): string[] {
        const result: string[] = input?.split(',');
        return result;
    }

    parseJSON(data) {
        // console.log(JSON.parse(data), 'oi')
        return JSON.parse(data);
    }

    closeDialog() {
        this.dialogRef.close();
    }

}