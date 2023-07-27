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
  constructor(
    private service: SampleReportService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    // console.log(this.reportDetails, 'REPORT DETAILS...')
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
