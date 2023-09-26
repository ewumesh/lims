import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { TestRequestDetailsService } from "src/app/services/analyst/test-request-details/test-request-details.service";

import  NepaliDate from 'nepali-datetime'
import { DatePipe } from '@angular/common';

@Component({
    templateUrl:'./lab-sheet.html',
    styleUrls:['./lab-sheet.scss']
})

export class LabSheetComponent {
    data: any;
    userDetails:any;

    // sampleDetails:any;

    constructor(
        private route: ActivatedRoute,
        private pipe: DatePipe,
        private dialogRef: MatDialogRef<LabSheetComponent>,
        @Inject(MAT_DIALOG_DATA)
        public sampleDetails: any,
        private service: TestRequestDetailsService
    
    ) {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

        // this.getTestResultDetails();
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


    // getTestResultDetails() {
    //     let id = this.route.snapshot.paramMap.get('id');
    //     let payload = {
    //       id: this.id,
    //       user: this.userDetails.id
    //     }
    //     this.service.getDetailsForLabSheet(payload).subscribe(response => {
    //         this.sampleDetails = response;
    //       let apiResponse = response;
    //       this.data = response;
    
    //     })
    //   }
    
}