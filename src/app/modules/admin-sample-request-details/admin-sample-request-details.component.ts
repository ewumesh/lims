import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { FinalReportViewService } from "src/app/services/final-report-view/final-report-view.serivce";
import { ToastService, TOAST_STATE } from "src/app/shared/toastr/toastr.service";
import { ReportRawDataComponent } from "../final-report-view/raw-data/report-raw-data";
import { ViewReportRemarksComponent } from "../final-report-view/view-remarks";
import { AdminSampleRequestDetailsService } from "src/app/services/admin-sample-request-details/service";
import { ApproveFinalSampleComponent } from "./approve/approve-final-sample.component";


@Component({
    templateUrl:'./admin-sample-request-details.component.html',
    styleUrls: ['./admin-sample-request-details.scss'],
})

export class AdminSampleRequestDetailComponent{
    isLoading = true;

    reportDetails: any= {};
  
    isSending: boolean =false;
  
    sampleStatus:any;
  
    loggedUserDetails: any;
  
    rawDataSheet:any;
    constructor(
      private service: AdminSampleRequestDetailsService,
      private route: ActivatedRoute,
      private toast: ToastService,
      private dialog: MatDialog
      ) {
        this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'))
      }
  
    ngOnInit(): void {
      this.getReportDetails();
      this.getRawData();
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
      console.log(d, 'REMARKSW')
      let data = {
        remarks: d?.sample_form?.remarks
      }
      this.dialog.open(ViewReportRemarksComponent, {
        data:data
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

    approveSample() {
        let id = this.route.snapshot.paramMap.get('id');
        let payload = {
          sample_form: id,
          is_verified: false,
          is_sent: true
        }

        this.dialog.open(ApproveFinalSampleComponent, {
            data: payload
        })
    }
  
  
    getReportDetails() {
      let id = this.route.snapshot.paramMap.get('id');
      let payload = {
        id: id
      }
      this.service.getSampleRequestDetails(payload).subscribe(res => {
        this.reportDetails = res;
        this.isLoading = false;
        this.getRawData();
      },
       (error) => {
        this.isLoading = false;
       })
    }
}