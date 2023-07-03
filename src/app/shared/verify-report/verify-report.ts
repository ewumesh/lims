import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'verify-report',
  templateUrl: './verify-report.html',
  styleUrls: ['./verify-report.scss']
})
export class VerifyReportComponent implements OnInit {
  status = 'pending';
  @Input() reportDetails;

  @Input()rawDataSheet;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.reportDetails, 'REPORT DETAILS...')
   }
}
