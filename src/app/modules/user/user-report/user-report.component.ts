import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserReportService } from 'src/app/services/user/user-report/user-report.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.scss']
})
export class UserReportComponent implements OnInit {
  isLoading = true;
  isLoadingDownloadBtn= false;

  reportDetails: any= {};

  isSending: boolean =false;

  sampleStatus:any;

  userDetails:any;
  isLoadingDownloadBtnN= false;

  constructor(
    private service: UserReportService,
    private route: ActivatedRoute,
    private toast: ToastService
    ) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }

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
      this.toast.showToast(TOAST_STATE.success, 'Sample Sent for Verification Successfully!');
      this.dissmissMessage();
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
    this.isLoadingDownloadBtn = true;
    let payload = {
      id: this.route.snapshot.paramMap.get('id'),
      report_type: 'pdf',
      report_name: 'final-report',
      report_lang: 'en'
    }
    this.service.downloadReport(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'Report Download Successfully!');
      this.dissmissMessage();
      this.isLoadingDownloadBtn = false;
    },(error) => {
      this.isLoadingDownloadBtn = false;
    })
  }

  downloadReportNepali() {
    this.isLoadingDownloadBtnN = true;
    let payload = {
      id: this.route.snapshot.paramMap.get('id')
    }

    this.service.downloaReportNepali(payload).subscribe(res => {
      this.isLoadingDownloadBtnN = false;
      this.toast.showToast(TOAST_STATE.success, 'Report Download Successfully!');
      this.dissmissMessage();
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
