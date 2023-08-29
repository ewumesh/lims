import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { ViewVieriferRemarks } from './view-remarks/view-remarks';
import { MicroRawDataVerifierComponent } from './view-micro-raw/micro-raw-data-verifier';

@Component({
  selector: 'verify-report',
  templateUrl: './verify-report.html',
  styleUrls: ['./verify-report.scss']
})
export class VerifyReportComponent implements OnInit {
  status = 'pending';
  @Input() reportDetails;

  @Input()rawDataSheet;

  userDetails:any;

  clientCategories:any[] = [];

  constructor(
    private service: SampleReportService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getClientCategories();
    // console.log(this.reportDetails, 'REPORT DETAILS...')
   }

   getClientCategories() {
    this.service.getCategories().subscribe(res => {
      this.clientCategories = res.results;
    })
   }

   getClientCategoryName(id) {
    return this.clientCategories.find(a => a.id === id)?.name;
   }

   getUserDetails(){
    this.service.getUserDetails(this.reportDetails?.owner_user?.id).subscribe(res => {
      this.userDetails = res;
    })
   }

   viewRemarks(data, user) {
    if(user === 'analyst' ) {

    } else {
      data.remarks = data.supervisor_remarks
    }

    this.dialog.open(ViewVieriferRemarks, {
      data:data
    })
   }

   downloadRawDatasheet(id) {
    this.service.downloadRawData(id);
   }

   printRawData(id) {
    this.service.printRawData(id);
   }

   viewMicroRawData(a) {
    let instance: MatDialogRef<MicroRawDataVerifierComponent, any>;

    instance = this.dialog.open(MicroRawDataVerifierComponent, {
      data:a
    })
   }
}
