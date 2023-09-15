import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { SupervisorReportViewService } from "src/app/services/supervisor/supervisor-report-view/service";
import { SupervisorReportViewRemarksComponent } from "./remarks/remakrs";
import { SupervisorReportViewRawDataComponent } from "./raw-data/supervisor-report-raw-data";
import { MicroSupervisorRawDataComponent } from "./micro-supervisor-raw-data/micro-supervisor-raw-data";


@Component({
    templateUrl: './supervisor-report.view.html',
    styleUrls: ['./supervisor-report-view.scss']
})

export class SupervisorReportViewComponent implements OnInit {
    reportDetails: any;
    loggedUserDetails: any;

    supervisorRawData:any;

    isLoading: boolean = false;

    constructor(
        private service:SupervisorReportViewService,
        private route: ActivatedRoute,
        private dialog: MatDialog
        ) {
            this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        }


    ngOnInit() {
        this.getReportDetails();
    }

    getReportDetails() {
        let id = this.route.snapshot.paramMap.get('id');
        let payload = {
            id: id
        }
        this.service.getSampleReportDetails(payload).subscribe(res => {
            this.reportDetails = res;

            this.getSupervisorRawData();
        })
    }

    viewRemarks(data, type){
      this.dialog.open(SupervisorReportViewRemarksComponent, {
        data: data.remarks
      })
    }

    viewMicroRawData(data) {
      let instance: MatDialogRef<MicroSupervisorRawDataComponent,any>;

      instance = this.dialog.open(MicroSupervisorRawDataComponent, {
        data: data
      })
    }

    getSupervisorRawData() {
        let id = this.route.snapshot.paramMap.get('id');
        this.service.getSupervisorRawData(this.reportDetails?.sample_form?.sample_lab_id).subscribe(res => {
          this.supervisorRawData = res;
        }  )
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

      downloadRawDatasheet(id) {
        let payload = {
          id:id
        }
        this.service.downloadRawData(id);
      }
    
      printRawData(id) {
        let payload = {
          id:id
        }
        this.service.printRawData(id);
      }

      downloadRawDatasheetM(id) {
        let payload = {
          id:id
        }
        this.service.downloadRawDataM(id);
      }
    
      printRawDataM(id) {
        let payload = {
          id:id
        }
        this.service.printRawDataM(id);
      }


      viewRawData(a) {
        this.dialog.open(SupervisorReportViewRawDataComponent, {
          data: a
        })
      }
}