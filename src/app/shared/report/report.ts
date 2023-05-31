import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.html',
  styleUrls: ['./report.scss']
})
export class ReportComponent implements OnInit {
  status = 'pending';
  @Input() reportDetails;
  constructor() { }

  ngOnInit(): void {
    console.log(this.reportDetails, 'REPORT DETAILS...')
   }
}
