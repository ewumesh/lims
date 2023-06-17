import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignedSampleAdminDetailsService } from 'src/app/services/assigned-sample-admin-details/assigned-sample-admin-details.service';

@Component({
  templateUrl: './assigned-sample-admin-details.component.html',
  styleUrls: ['./assigned-sample-admin-details.scss']
})
export class AssignedSampleAdminDetailsComponent implements OnInit {

  isLoading = true;

  reportDetails: any= {};

  isSending: boolean =false;

  sampleStatus:any;
  constructor(
    private service: AssignedSampleAdminDetailsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getAssigendSampleDetails();
   }

  getAssigendSampleDetails() {
    let payload = {
      id: this.route.snapshot.paramMap.get('id')
    }
    this.service.getAssignedSampleDetails(payload).subscribe(res => {
      this.reportDetails = res;
    })
  }
}
