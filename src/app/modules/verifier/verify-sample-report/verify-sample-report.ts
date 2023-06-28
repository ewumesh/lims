import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { ToastService, TOAST_STATE } from 'src/app/shared/toastr/toastr.service';
import { VerificationRemarksComponent } from './component/verification-remarks';

@Component({
  templateUrl: './verify-sample-report.html',
  styleUrls: ['./verify-sample.scss']
})
export class VerifySampleReportomponent implements OnInit {
  isLoading = true;

  reportDetails: any= {};

  isSending: boolean =false;

  sampleStatus:any;

  constructor(
    private service: SampleReportService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getReportDetails();
    this.isSampleSentForSupervisor();
  }

  openRemarks() {
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: this.sampleStatus[0].id,
      // sample_form: id,
      is_verified: true,
      sample_form:id 
      // is_sent: true
    }
    this.dialog.open(VerificationRemarksComponent, {
      data: payload ? payload : null
    })
  }


  sendForVerification() {
    this.isSending = true;
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: this.sampleStatus[0].id,
      // sample_form: id,
      is_verified: true,
      // is_sent: true
    }

    this.service.sendReportForVerificationFrom(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'Sample Verified Successfully!');
      // this.toast.showToast(
      //   TOAST_STATE.danger,
      //   'All the field(s) are not valid.');
      // this.dissmissMessage();
      this.dissmissMessage();
      this.isSampleSentForSupervisor();
      this.isSending = false;
      this.router.navigate(['/dashboard/lab-report'])
    }, (error) => {
      this.isSending = false;
    })
  }

  dissmissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2500);
  }

  isSampleSentForSupervisor() {
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: id
    }
    this.service.isSentForVrification(payload).subscribe(response => {
      // console.log(response, 'RESPONSE')
      this.sampleStatus = response.results;
    })
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
