import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FinalReportViewService } from 'src/app/services/final-report-view/final-report-view.serivce';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { ReportRawDataComponent } from './raw-data/report-raw-data';
import { ViewReportRemarksComponent } from './view-remarks';
import { ReportMicroRawDataComponent } from './report-view-micro-raw-data/micro-raw-data';
import { ViewReportDoc } from './view-docs';
import { AdminFinalReportComponent } from './view-sample/admin-view-sample';
import { ReportLabSheetComponent } from './lab-sheet/lab-sheet';
import { ReportViewRawDataComponent } from './report-view-raw-data/report-view-raw-data.component';

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
  sampleUserDetails:any;

  clientCategories:any
  constructor(
    private service: FinalReportViewService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private dialog: MatDialog
    ) {
      this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'))
    }

    getSampleUserDetails(userId) {
      this.service.getUserDetails(userId).subscribe(res => {
        this.sampleUserDetails = res;
      })
     }

  ngOnInit(): void {
    this.getReportDetails();
    this.getClientCategories();
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

   viewReceipt(link) {
    this.dialog.open(ViewReportDoc, {
      data: link
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

   viewReportRawData(data) {

    this.dialog.open(ReportViewRawDataComponent, {
      data: data,
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

   downloadRawDatasheetMicro(id) {
    this.service.downloadRawDataM(id);
   }

   printMicroRawDatasheet(id) {
    this.service.printRawDataM(id);
   }

   printRawData(id) {
    this.service.printRawData(id);
   }

  dissmissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2500);
  }

  getClientCategories() {
    this.service.getCategories().subscribe(res => {
      this.clientCategories = res?.results;
    })
  }

  getClientCategoryName(id) {
    return this.clientCategories.find(a => a.id === id)?.name;
  }

  viewLabSheet(data?) {
    this.dialog.open(ReportLabSheetComponent, {
      data:data,
      height:'80vh'
    })
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
      this.getSampleUserDetails(res.owner_user.id)

      if(this.loggedUserDetails.role ===4) {
        this.getAnalystRawData();
      } else if(this.loggedUserDetails.role === 3) {
        this.getSupervisorRawData();
      } else if(this.loggedUserDetails.role ===6 || this.loggedUserDetails.role ===7 || this.loggedUserDetails.role ===1 || this.loggedUserDetails.role ===2) {
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

  viewSample() {
    this.dialog.open(AdminFinalReportComponent, {
      height:'80vh',
      data:this.reportDetails
    })
  }
}
