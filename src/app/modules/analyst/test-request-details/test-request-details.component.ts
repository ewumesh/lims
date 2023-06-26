import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TestRequestDetailsService } from 'src/app/services/analyst/test-request-details/test-request-details.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { CalculateComponent } from './calculate/calculate.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { AnalystRemarksComponent } from './remarks/analyst-remarks';
import { RawDataRemarksComponent } from './raw-data-remarks/raw-data-remarks';
import { ViewRawDataComponent } from './view-raw-data/view-raw-data';
import { ViewRemarksComponent } from './view-remarks/view-remarks';

@Component({
  templateUrl: './test-request-details.component.html',
  styleUrls: ['./test-request-details.component.scss'],
  animations: [collectionInOut]
})
export class TestRequestDetailsComponent implements OnInit {

  displayedColumns: string[] = ['sn', 'parameter', 'methods','formula','mandatory_standard', 'units', 'result', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;
  userDetails:any;

  testRequestDetails:any;

  isSend = false;

  responseError = null;

  rawDataSheet:any[] =[];

  constructor(
    private service: TestRequestDetailsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toast: ToastService,
    private router: Router
    ) { }

    sendToSupervisor() {
      this.isSend = true;
      // this.service.
      let payload  ={
        status: 'completed',
        is_supervisor_sent: true
      }
      let id = this.route.snapshot.paramMap.get('id')
      this.service.sendForVarification(payload, id).subscribe(res => {
        // console.log(res, 'RESponse')
        this.isSend = false;
        this.toast.showToast(TOAST_STATE.success, "Sent for supervisor successfully!");
        this.dismissToast();
        // this.getTestResultDetails();
        this.router.navigate(['/dashboard/lab-report'])
      }, (error) => {
        this.isSend = false;
      })
    }

    dismissToast() {
      setTimeout(() => {
        this.toast.dismissToast();
      }, 1500);

    }

  getTestResultDetails() {
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: id,
      user: this.userDetails.id
    }
    this.isLoading = true;
    this.service.getTestRequestDetails(payload).subscribe(response => {
      this.testRequestDetails = response;
      this.dataSource = response?.parameter;
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

    this.getTestResultDetails();
    this.getRawData();
   }

   calculate(data) {
    console.log(data, 'da')

    let allValue = {
      parameters: data,
      details: this.testRequestDetails,
      sample_form: this.testRequestDetails?.sample_form?.analyst_encode_id,
      // result: result,
      parameter: data.id,
      commodity: data.commodity,
      // formula_variable_fields_value:'awds'
    }
    let instance: MatDialogRef<CalculateComponent, any>;

    instance = this.dialog.open(CalculateComponent, {
      data: allValue ? allValue : null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getTestResultDetails();
    })
   }

   procceed() {
    let payload  ={
      status: 'completed',
      is_supervisor_sent: true,
      id:this.route.snapshot.paramMap.get('id')
    }
    this.dialog.open(AnalystRemarksComponent, {
      data: payload ? payload : null
    })
   }

   downloadRawDatasheet(id) {
    // let id = this.route.snapshot.paramMap.get('id');
    this.service.downloadRawData(id).subscribe(res => {
    })
   }

   printRawData(id) {
    // let id = this.route.snapshot.paramMap.get('id');
    this.service.printRawData(id).subscribe(res => {

    })
   }

   viewRemarks(data) {
    this.dialog.open(ViewRemarksComponent, {
      data:data
    })
   }

   supervisorRemarks(d) {
    console.log(d, 'REMARKSW')
    let data = {
      remarks: d?.sample_form?.remarks
    }
    this.dialog.open(ViewRemarksComponent, {
      data:data
    })
   }

   viewRawData(data) {
    let obj = {
      data: data,
      sample: this.rawDataSheet
    }
    this.dialog.open(ViewRawDataComponent, {
      data: obj,
      width:'1000px'
    })
   }

   getRawData() {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getRawData(id).subscribe(res => {
      this.rawDataSheet = res;
    }  )
   }

   saveResult(result, sampleId, parameterId, commodity) {
    // console.log(result, sampleId, parameterId,commodity, 'RESULT')

    let payload = {
      sample_form: this.testRequestDetails?.sample_form?.analyst_encode_id,
      result: result,
      parameter: parameterId,
      commodity: commodity.id,
      formula_variable_fields_value:'awds'
    }

    this.service.setResult(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, "Result Added Successfully!");
      this.dismissToast();
      this.getTestResultDetails();
    },(error) => {
      this.responseError = error?.error;
    })
    let patchPayload = {
      result: result
    }
   }

   generateRawDatasheet() {
    this.dialog.open(RawDataRemarksComponent, {
      data: this.testRequestDetails ? this.testRequestDetails: null
    })
   }
}
