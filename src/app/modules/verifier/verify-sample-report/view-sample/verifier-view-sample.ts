import { DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import  NepaliDate from 'nepali-datetime'


@Component({
    templateUrl:'./verifier-view-sample.html',
    styleUrls:['./verifier-view-sample.scss']
})

export class VerifierReportComponent {
    constructor(
        private pipe: DatePipe,
        private dialogRef: MatDialogRef<VerifierReportComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data: any,
    ) {
        console.log(data, 'ADDJKHBV')
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
        console.log(npDate, 'NEPALI DATE...', enDate)
        return `${npDate.year}-${npDate.month+1}-${npDate.day}`;
      }
}