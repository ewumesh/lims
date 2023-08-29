import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { TestRequestDetailsService } from "src/app/services/analyst/test-request-details/test-request-details.service";
import { SampleReportService } from "src/app/services/supervisor/sample-request/sample-request.service";



@Component({
    templateUrl:'./supervisor-lab-sheet.component.html',
    styleUrls:['./supervisor-lab-sheet.scss']
})

export class SupervisorLabSheetComponent {
    data: any;
    userDetails:any;

    // sampleDetails:any;

    constructor(
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<SupervisorLabSheetComponent>,
        @Inject(MAT_DIALOG_DATA)
        public sampleDetails: any,
        private service: SampleReportService
    
    ) {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
        console.log(this.sampleDetails, 'ODLA');

        this.getTestResultDetails();
    }


    getTestResultDetails() {
        let id = this.route.snapshot.paramMap.get('id');
        // let payload = {
        //   id: this.id,
        //   user: this.userDetails.id
        // }
        // this.service.getDetailsForLabSheet(payload).subscribe(response => {
        //     this.sampleDetails = response;
        //     console.log(response, 'asdjweodjdfkjfjkkjfg')
        //   let apiResponse = response;
        //   this.data = response;
    
        //     console.log(this.sampleDetails, 'SAMPLE DETAILS...')
        // })
      }
    
}