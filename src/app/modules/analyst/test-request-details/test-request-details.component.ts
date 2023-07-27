import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { MicroParameterDetailsComponent } from './parameter-details/micro-parameter-details';
import { ViewMicroRawDataComponent } from './view-micro-raw-data/view-micro-raw-data';
import { GenerateMicroRawDataComponent } from './generate-micro-raw-data/generate-micro-raw-data';

@Component({
  templateUrl: './test-request-details.component.html',
  styleUrls: ['./test-request-details.component.scss'],
  animations: [collectionInOut]
})
export class TestRequestDetailsComponent implements OnInit {

  displayedColumns: string[] = ['sn', 'parameter', 'methods', 'formula', 'mandatory_standard', 'units', 'result', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;
  userDetails: any;

  testRequestDetails: any;

  isSend = false;

  responseError = null;

  rawDataSheet: any[] = [];

  protected calculateDetails: any;

  calculateableData: any = {};

  private dataMutations: any = {
    myData: {}
  }

  requiredData: any = {

  }

  rawSampleTracking: any;

  otherDetailsForm: FormGroup;
isOtherDetails = false;
  otherDetailsErrorResponse: null


  constructor(
    private service: TestRequestDetailsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toast: ToastService,
    private router: Router
  ) { 
    this.initOtherForm();
  }

  sendToSupervisor() {
    this.isSend = true;
    // this.service.
    let payload = {
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

  initOtherForm() {
    this.otherDetailsForm = this.fb.group({
      sample_received_date: '',
      started_date:''
    })
  }

  saveOtherDetails() {
    this.isOtherDetails = true;
    let id = this.route.snapshot.paramMap.get('id');
    let payload = this.otherDetailsForm.value;
   this.service.sendForVarification(payload, id).subscribe(res => {
    this.isOtherDetails = false;
    this.toast.showToast(TOAST_STATE.success, 'Date Updated successfully!');
    this.getTestResultDetails();
   },(error)=> {
    this.isOtherDetails = false;
    this.otherDetailsErrorResponse = error?.error;
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

      let apiResponse = response;
      this.testRequestDetails = apiResponse;
      this.calculateDetails = this.testRequestDetails;
      this.dataMutations.details = response.sample_form;

      this.dataSource = response?.parameter;
      this.isLoading = false;
      this.getRawSampleTracking();
    })
  }

  getRawSampleTracking() {
    console.log(this.testRequestDetails, "resttata")
    let payload = {
      id: this.testRequestDetails?.sample_form?.id
    }
    this.service.getRawSampleTracking(payload).subscribe(res => {
      this.rawSampleTracking = res;
    })
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

    this.getTestResultDetails();
    this.getRawData();
    // this.getRawSampleTracking();
  }

  calculate(data) {
    // console.log(data, 'da')

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
      width: '800px',
      height: '900px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getTestResultDetails();
    })
  }

  procceed() {
    let payload = {
      status: 'completed',
      is_supervisor_sent: true,
      id: this.route.snapshot.paramMap.get('id')
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
      data: data
    })
  }

  //  parameters: data,
  //     details: this.testRequestDetails,
  //     sample_form: this.testRequestDetails?.sample_form?.analyst_encode_id,
  //     // result: result,
  //     parameter: data.id,
  //     commodity: data.commodity,

  microParameterDetails(data, sampleDetails) {

    let requiredList = this.testRequestDetails;
    requiredList.selectedParameter = data;
    requiredList.parameter = data;
    requiredList.sample_form = this.testRequestDetails?.sample_form?.id;
    requiredList.commodity = data.commodity;
    requiredList.details = this.testRequestDetails;

    // console.log(this.dataMutations, 'LIST...')

    let allValue = {
      parameters: data,
      details: this.dataMutations.details,
      sample_form: sampleDetails?.sample_form?.analyst_encode_id,
      // result: result,
      parameter: data.id,
      commodity: data.commodity,
      formula_variable_fields_value: 'awds',
      micro_table: data.micro_table,
      type: 'micro',
      id: this.testRequestDetails.id,
      is_existing: null
    }

    // console.log(data, 'MICRO')

    // console.log(allValue, 'MY VALUE...')

    let instance: MatDialogRef<MicroParameterDetailsComponent, any>
    instance = this.dialog.open(MicroParameterDetailsComponent, {
      width: '1200px',
      data: requiredList
    })

    instance.afterClosed().subscribe(res => {


      if (res?.status) {
        if (res.id) {
          allValue.micro_table = res.id;
          allValue.is_existing = true;
        }



        let calculateInstance: MatDialogRef<CalculateComponent, any>;

        calculateInstance = this.dialog.open(CalculateComponent, {
          data: allValue,
          width: '800px',
          height: '900px',
          autoFocus: false,
        })

        calculateInstance.afterClosed().subscribe(res => {
          this.getTestResultDetails();
        })
      }
    })
  }

  supervisorRemarks(d) {
    // console.log(d, 'REMARKSW')
    let data = {
      remarks: d?.sample_form?.remarks
    }
    this.dialog.open(ViewRemarksComponent, {
      data: data
    })
  }

  viewMicroRawData(data) {
    let instance: MatDialogRef<ViewMicroRawDataComponent, any>;

    instance = this.dialog.open(ViewMicroRawDataComponent, {

      data: data
    })
  }

  viewRawData(data) {
    // console.log(data, "ISTER")
    let obj = {
      data: data,
      sample: this.rawDataSheet
    }
    if (data.test_type === 'Microbiological') {
      this.viewMicroRawData(data);
    } else {
      this.dialog.open(ViewRawDataComponent, {
        data: obj,
        width: '1000px'
      })
    }
  }

  getRawData() {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getRawData(id).subscribe(res => {
      this.rawDataSheet = res;
    })
  }

  saveResult(result, sampleId, parameterId, commodity) {
    // console.log(result, sampleId, parameterId,commodity, 'RESULT')

    let payload = {
      sample_form: this.testRequestDetails?.sample_form?.analyst_encode_id,
      result: result,
      parameter: parameterId,
      commodity: commodity.id,
      formula_variable_fields_value: 'awds'
    }

    this.service.setResult(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, "Result Added Successfully!");
      this.dismissToast();
      this.getTestResultDetails();
    }, (error) => {
      this.responseError = error?.error;
    })
    let patchPayload = {
      result: result
    }
  }

  generateRawDatasheet() {
    console.log(this.testRequestDetails.parameter[0].test_type, 'On pa')

    // if (this.testRequestDetails.parameter[0].test_type === 'Microbiological') {
    //   this.dialog.open(GenerateMicroRawDataComponent, {
    //     width:'800px',
    //     height:'80vh',
    //     data:this.testRequestDetails ? this.testRequestDetails : null
    //   })
    // } else {
      this.dialog.open(RawDataRemarksComponent, {
        height:'100vh',
        data: this.testRequestDetails ? this.testRequestDetails : null
      })
    // }
  }
}
