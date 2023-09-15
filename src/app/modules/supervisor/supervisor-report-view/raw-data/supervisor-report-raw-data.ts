import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import  NepaliDate from 'nepali-datetime'


@Component({
    templateUrl:'./raw-data.html',
    styles:[`

    .formula{
        margin-bottom: 1rem;
      }
      
      .formula > *{
        margin-bottom: 3px;
      }
      .formula h2{
        font-size: 1rem;
        font-family: poppins;
        font-weight: 600;
      
      }
      
      .formula p{
        font-size: 1rem;
        font-family: poppins;
        font-weight: 500;
      }
      
      td , th{
        border: 1px solid black;
        text-align: left;
        padding: 4px 2px;
        font-weight: 600;
      }
      
      .top-table{
      width: 100%;
      }
      
      .top-table h2{
      font-size: 20px;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      }
      
      .top-table p{
      font-size: 20px ;
      font-weight: 400;
      line-height: 1;
      text-align: center;
      }
      
      .heading{
      font-size: 22px;
      font-weight: 600;
      text-align: center;
      margin: 10px 0;
      }
      
      .bottom-table .detail{
      font-weight: 500;
      }
      
      .text-center{
      text-align: center;
      }
      
      .top-table img{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      }
      
    `]
})


export class SupervisorReportViewRawDataComponent implements OnInit {

    rawDatasheetDetails: any

    constructor(
        private dialogRef: MatDialogRef<SupervisorReportViewRawDataComponent>,
        private pipe: DatePipe,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
    ) { 
        // console.log(this.data, 'MY DATA...')
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