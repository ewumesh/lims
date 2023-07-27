import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FinalReportViewService } from 'src/app/services/final-report-view/final-report-view.serivce';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { ReportRawDataComponent } from './raw-data/report-raw-data';
import { ViewReportRemarksComponent } from './view-remarks';
import { ReportMicroRawDataComponent } from './report-view-micro-raw-data/micro-raw-data';

@Component({
  templateUrl: './final-report-view-component.html',
  styleUrls: ['./final-report-view.scss']
})
export class FinalReportViewComponent implements OnInit {
  isLoading = true;

  reportDetails: any= {};

  isSending: boolean =false;

  sampleStatus:any;

  loggedUserDetails: any;

  rawDataSheet:any;

  analystRawData:any;
  supervisorRawData:any;

  constructor(
    private service: FinalReportViewService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private dialog: MatDialog
    ) {
      this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'))
    }

  ngOnInit(): void {
    this.getReportDetails();
  }

  downloadRawDatasheetAnalyst(id) {
    // let id = this.route.snapshot.paramMap.get('id');
    this.service.downloadRawDataAnalyst(id).subscribe(res => {
    })
   }

   printRawDataAnalyst(id) {
    // let id = this.route.snapshot.paramMap.get('id');
    this.service.printRawDataAnalyst(id).subscribe(res => {

    })
   }

  getAnalystRawData() {
    let id = this.reportDetails?.sample_form_has_param_id
    this.service.getAnalystRawData(id).subscribe(res => {
      this.analystRawData = res;
    }  )
  }

  getSupervisorRawData() {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getSupervisorRawData(id).subscribe(res => {
      this.supervisorRawData = res;
    }  )
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

  getRawData() {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getRawData(id).subscribe(res => {
      this.rawDataSheet = res;
    }  )
   }

   viewRawData(data) {
    let obj = {
      data: data,
      sample: this.rawDataSheet
    }
    this.dialog.open(ReportRawDataComponent, {
      data: obj,
      width:'1000px'
    })
   }

   viewRemarks(data) {
    this.dialog.open(ViewReportRemarksComponent, {
      data:data
    })
   }

   supervisorRemarks(d) {
    // console.log(d, 'REMARKSW')
    let data = {
      remarks: d?.sample_form?.remarks
    }
    this.dialog.open(ViewReportRemarksComponent, {
      data:data
    })
   }

   viewMicroRawData(a) {
    let instance: MatDialogRef<ReportMicroRawDataComponent, any>;

    instance = this.dialog.open(ReportMicroRawDataComponent, {
      data: a
    })
   }

   downloadRawDatasheet(id) {
    this.service.downloadRawData(id);
   }

   printRawData(id) {
    this.service.printRawData(id);
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
      report_lang: 'en',
      role: this.loggedUserDetails.role
    }
    this.service.downloadReport(payload);
  }

  downloadReportNepali() {
    let payload = {
      id: this.route.snapshot.paramMap.get('id'),
      // report_type: 'pdf',
      // report_name: 'final-report',
      // report_lang: 'en',
      role: this.loggedUserDetails.role
    }
    this.service.downloadReportNepali(payload).subscribe(res => {
      
    });
  }


  getReportDetails() {
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: id
    }
    this.service.getAssignedSamples(payload).subscribe(res => {
      this.reportDetails = res;
      this.isLoading = false;
      // this.getRawData();

      if(this.loggedUserDetails.role ===4) {
        this.getAnalystRawData();
      } else if(this.loggedUserDetails.role === 3) {
        this.getSupervisorRawData();
      } else if(this.loggedUserDetails.role ===6) {
        this.getRawData();
      }
    },
     (error) => {
      this.isLoading = false;
     })
  }

  downloadSupervisorRawData(id) {
    this.service.downloadRawDataSupervisor(id).subscribe(res => {
    })
  }

  printSupervisorRawData(id) {
    
  }
}
