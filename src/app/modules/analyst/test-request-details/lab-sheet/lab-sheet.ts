import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { TestRequestDetailsService } from "src/app/services/analyst/test-request-details/test-request-details.service";



@Component({
    templateUrl:'./lab-sheet.html',
    styleUrls:['./lab-sheet.scss']
})

export class LabSheetComponent {
    data: any;
    userDetails:any;

    sampleDetails:any;

    constructor(
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<LabSheetComponent>,
        @Inject(MAT_DIALOG_DATA)
        public id: any,
        private service: TestRequestDetailsService
    
    ) {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
        console.log(this.data, 'ODLA');

        this.getTestResultDetails();
    }


    getTestResultDetails() {
        let id = this.route.snapshot.paramMap.get('id');
        let payload = {
          id: this.id,
          user: this.userDetails.id
        }
        this.service.getDetailsForLabSheet(payload).subscribe(response => {
            this.sampleDetails = response;
            console.log(response, 'asdjweodjdfkjfjkkjfg')
          let apiResponse = response;
          this.data = response;
    
            console.log(this.sampleDetails, 'SAMPLE DETAILS...')
        })
      }
    
}