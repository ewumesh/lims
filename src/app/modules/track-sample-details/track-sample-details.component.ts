import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackSampleDetailsService } from 'src/app/services/track-sample-details/track-sample-details.service';

@Component({
  templateUrl: './track-sample-details.component.html',
  styleUrls: ['./track-sample.scss']
})
export class TrackSampleDetailsComponent implements OnInit {

  sampleId;

  constructor(
    private service: TrackSampleDetailsService,
    private route: ActivatedRoute
    ) {
      this.sampleId = this.route.snapshot.paramMap.get('id');
     }

  reportDetails: any;

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    console.log(this.sampleId, "IDDDDD")
    this.service.getSampleDetails(this.sampleId).subscribe(res => {
      this.reportDetails = res;
    })
  }
}
