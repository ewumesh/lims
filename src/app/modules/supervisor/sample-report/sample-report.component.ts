import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';

@Component({
  templateUrl: './sample-report.component.html',
  styleUrls: ['./sample-report.scss']
})
export class SampleReportComponent implements OnInit {

  isLoading = true;

  reportDetails: any= {};

  constructor(
    private service: SampleReportService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getReportDetails();
  }

  getReportDetails() {
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: id
    }
    this.service.getAssignedSamples(payload).subscribe(res => {
      this.reportDetails = res;
      this.isLoading = false;
    },
     (error) => {
      this.isLoading = false;
     })
  }
}
