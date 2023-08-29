import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssignedSampleAdminDetailsService } from 'src/app/services/assigned-sample-admin-details/assigned-sample-admin-details.service';
import { ReAssignSupervisorComponent } from './re-assign-supervisor/re-assign-supervisor';
import { ViewAssignedSampleDoc } from './view-docs';

@Component({
  templateUrl: './assigned-sample-admin-details.component.html',
  styleUrls: ['./assigned-sample-admin-details.scss']
})
export class AssignedSampleAdminDetailsComponent implements OnInit {

  isLoading = true;

  reportDetails: any= {};

  isSending: boolean =false;

  sampleStatus:any;

  sampleUserDetails:any;

  clientCategories: any;

  constructor(
    private service: AssignedSampleAdminDetailsService,
    private route: ActivatedRoute,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.getAssigendSampleDetails();
    this.getClientCategories();
   }

   getSampleUserDetails(userId) {
    this.service.getUserDetails(userId).subscribe(res => {
      this.sampleUserDetails = res;
    })
   }

  getAssigendSampleDetails() {
    let payload = {
      id: this.route.snapshot.paramMap.get('id')
    }
    this.service.getAssignedSampleDetails(payload).subscribe(res => {
      this.reportDetails = res;

      this.getSampleUserDetails(res.owner_user.id)
    })
  }

  getClientCategories() {
    this.service.getCategories().subscribe(res => {
      this.clientCategories = res?.results;
    })
  }

  getClientCategoryName(id) {
    return this.clientCategories?.find(a => a.id === id)?.name;
  }

  viewReceipt(link) {
    this.dialog.open(ViewAssignedSampleDoc, {
      data: link
    })
  }

  reAssign(parameter, testType) {
    // let payload = {
    //   sample_form: this.reportDetails.sampleId,
    //   parameters:[parameter],
    //   test_type:testType
    // }

    // this.dialog.open(ReAssignSupervisorComponent, {
    //   data: payload,
    //   width: '600px'
    // })

    let instance: MatDialogRef<ReAssignSupervisorComponent, any>;
    let payload = {
      sample_form: this.reportDetails.id,
      parameters:[parameter],
      test_type:testType
    }

    instance = this.dialog.open(ReAssignSupervisorComponent, {
      data: payload,
      width: '600px',
      autoFocus: false,
    })
    instance.afterClosed().subscribe(res => {
      this.getAssigendSampleDetails();
      // this.router.navigate(['/dashboard/sample-requests'])
    })
  }
}
