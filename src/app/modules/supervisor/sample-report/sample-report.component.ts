import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './sample-report.component.html',
  styleUrls: ['./sample-report.scss']
})
export class SampleReportComponent implements OnInit {

  isLoading = true;

  reportDetails: any= {};

  isSending: boolean =false;

  sampleStatus:any;

  constructor(
    private service: SampleReportService,
    private route: ActivatedRoute,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    this.getReportDetails();
    this.isSampleSentForSupervisor();
  }


  sendForVerification() {
    this.isSending = true;
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      sample_form: id,
      is_verified: false,
      is_sent: true
    }

    this.service.sendReportForVerification(payload).subscribe(res => {
      // console.log(res, "HAHAHAHAHAHHHHHHH")
      this.toast.showToast(TOAST_STATE.success, 'Sample Sent for Verification Successfully!');
      // this.toast.showToast(
      //   TOAST_STATE.danger,
      //   'All the field(s) are not valid.');
      // this.dissmissMessage();
      this.dissmissMessage();
      this.isSampleSentForSupervisor()
      this.isSending = false;
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
