import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TrackSampleDetailsService } from 'src/app/services/track-sample-details/track-sample-details.service';
import { ViewTrackDoc } from './view-docs';

@Component({
  templateUrl: './track-sample-details.component.html',
  styleUrls: ['./track-sample.scss']
})
export class TrackSampleDetailsComponent implements OnInit {

  sampleId;

  constructor(
    private service: TrackSampleDetailsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) {
      this.sampleId = this.route.snapshot.paramMap.get('id');
     }

  reportDetails: any;
  sampleUserDetails;

  viewReceipt(link) {
    this.dialog.open(ViewTrackDoc, {
      data: link
    })
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getSampleUserDetails(userId) {
    this.service.getUserDetails(userId).subscribe(res => {
      this.sampleUserDetails = res;
    })
   }
  getDetails() {
    // console.log(this.sampleId, "IDDDDD")
    this.service.getSampleDetails(this.sampleId).subscribe(res => {
      this.reportDetails = res;
      this.getSampleUserDetails(res.owner_user.id)
    })
  }
}
