import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinalReportViewService } from 'src/app/services/final-report-view/final-report-view.serivce';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './final-report-view-component.html',
  styleUrls: ['./final-report-view.scss']
})
export class FinalReportViewComponent implements OnInit {
  isLoading = true;

  reportDetails: any= {};

  isSending: boolean =false;

  sampleStatus:any;

  constructor(
    private service: FinalReportViewService,
    private route: ActivatedRoute,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    this.getReportDetails();
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
      console.log(res, "HAHAHAHAHAHHHHHHH")
      this.toast.showToast(TOAST_STATE.success, 'Sample Sent for Verification Successfully!');

      // this.isSampleSentForSupervisor()
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

  downloadReport() {
    let payload = {
      id: this.route.snapshot.paramMap.get('id'),
      report_type: 'pdf',
      report_name: 'final-report',
      report_lang: 'en'
    }
    this.service.downloadReport(payload);
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