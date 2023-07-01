import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SampleRequestDetailsService } from 'src/app/services/sample-request-details/sample-request-details.service';
import { AssignSampleDialogComponent } from './payment/assign-sample-dialog.component';
import { AssignSampleComponent } from './assign/assign-sample.component';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { MatStepper } from '@angular/material/stepper';
import { PaymentReceiptComponent } from './receipt/receipt';
import { RejectComponent } from './reject-sample';

@Component({
  templateUrl: './sample-request-details.html',
  styleUrls: ['./sample-request.scss']
})
export class SampleRequestDetailsComponent implements OnInit, AfterViewInit {

  sampleId:any;
  sampleDetails: any;

  commodities:any[] = [];

  isProcceedForPayment = false;

  paymentForm: FormGroup;

  paymentReceipt: any;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  @ViewChild('stepper') stepper: MatStepper;

  message: any

  isPaymentReceipt: boolean = false;

  isPaymentProcceed = false;

  responseError = null;
  responseErrorForAssign = null;

  assignSampleForm: FormGroup;

  isAssignProcceed = false;

  users: any[] = [];

  distributedSample = {
    ch: [],
    bi:[],
    in:[]
  }

  totalPrice = 0;

  constructor(
    private service: SampleRequestDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toast: ToastService
    ) {
    this.sampleId = this.route.snapshot.paramMap.get('id');
   }

   getUserList() {
    let payload = {
      search: '',
      page: '',
      size: '',
      role: '3',
      client_category_id: ''
    }

    this.service.getUsersList(payload).subscribe(res => {
      this.users = res;
    })
  }

  viewReceipt(url) {
    this.dialog.open(PaymentReceiptComponent, {
      data: url
    })
  }

   assignToSupervisor() {
    this.isAssignProcceed = true;
    if (this.assignSampleForm.pristine) {
      this.message = {};
      this.isAssignProcceed = false;
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }
    let payload = {
      supervisor_user: this.assignSampleForm.value.supervisor_user,
      form_available: 'supervisor',
      status: 'not_assigned'
      // sample_form: this.data?.id
      // parameter: this.data?.parameters,
      // commodity_id: this.data?.commodity_id
    }

    this.service.assignSampleToSupervisor(payload, this.sampleDetails.id).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, res?.message);
      this.isAssignProcceed = false;
      this.dismissMessage();
      this.isProcceedForPayment = false;
      this.router.navigate(['/dashboard/sample-requests']);
    },
    (error) => {
      this.isAssignProcceed = false;
      window.scroll(0, 0)
      this.message = {};
      this.responseErrorForAssign = error?.error;

    })
  }

   private initForm() {
    this.assignSampleForm = this.fb.group({
      supervisor_user: ['',Validators.required],
      form_available: '',
      sample_form: ''
    })
  }

  get samplePaymentDetails(): FormArray {
    return this.paymentForm.get('samplePayment') as FormArray;
  }

  addDocList() {
    
    // if (this.editPage) {
    //   this.propertyDetail.push(this.createEditPageDocListArray());
    // } else {
      this.samplePaymentDetails.push(this.createPaymentDocList());
    // }
  }

  createPaymentDocList() {
    return this.fb.group({
      voucher_number: new FormControl(''),
      owner_email: new FormControl(''),
      sample_form: new FormControl(''),
      register_date: new FormControl(''),
      amount: new FormControl(''),
      file: new FormControl(''),
    })
  }

  rejectSample(data) {
    this.dialog.open(RejectComponent, {
      data:data
    })
  }

   procceed() {
    this.isProcceedForPayment = true;
    window.scroll(0,0)
   }

   back() {
    this.isProcceedForPayment = false;
   }

   goToNextStep() {
    this.stepper.next();
  }

   initPaymentForm() {
    
    this.paymentForm = this.fb.group({
      // voucher_number: ['', Validators.required],
      // owner_email: [this.sampleDetails?.owner_user],
      // sample_form: [this.sampleDetails?.id],
      // register_date: ['', Validators.required],
      // amount: ['', Validators.required],
      samplePayment: new FormArray([]),
    })

    this.addDocList();
  }

   pay() {
        let instance: MatDialogRef<AssignSampleDialogComponent, any>;

    instance = this.dialog.open(AssignSampleDialogComponent, {
      data: this.sampleDetails ? this.sampleDetails : null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getSampleDetails();
    })
   }

   assign(parameter, testType) { 
    let instance: MatDialogRef<AssignSampleComponent, any>;

    let payload = {
      sample_form: this.sampleId,
      parameters:[parameter],
      test_type:testType
    }

    instance = this.dialog.open(AssignSampleComponent, {
      data: payload,
      width: '600px',
      autoFocus: false,
    })
    instance.afterClosed().subscribe(res => {
      this.getSampleDetails();
      // this.router.navigate(['/dashboard/sample-requests'])
    })
   }

   assignAll(test_type) {

    let parameters:any[] = [];
    if(test_type === 'Instrumental') {
      console.log(this.distributedSample.in, 'kjhgfdghjkljcx')
      let actP = this.distributedSample.in;
      
      actP.forEach(a => {
        console.log(a.exists_supervisor_parameter, 'alask')
        if(a.exists_supervisor_parameter === false) {
          parameters.push(a.id);
        }
      })
    } else if(test_type ==='Chemical') {
      let actP = this.distributedSample.ch;
      
      actP.forEach(a => {
        console.log(a.exists_supervisor_parameter, 'alask')
        if(a.exists_supervisor_parameter === false) {
          parameters.push(a.id);
        }
      })
    } else if(test_type ==='Microbiological') {
      let actP = this.distributedSample.bi;
      
      actP.forEach(a => {
        console.log(a.exists_supervisor_parameter, 'alask')
        if(a.exists_supervisor_parameter === false) {
          parameters.push(a.id);
        }
      })
    }

    let instance: MatDialogRef<AssignSampleComponent, any>;

    let payload = {
      sample_form: this.sampleId,
      parameters:parameters,
      test_type: test_type
    }

    instance = this.dialog.open(AssignSampleComponent, {
      data: payload,
      width: '600px',
      autoFocus: false,
    })
    instance.afterClosed().subscribe(res => {
      this.getSampleDetails();
      // this.router.navigate(['/dashboard/sample-requests'])
    })
   }

  ngOnInit(): void {
    this.initPaymentForm();
    this.getSampleDetails();
    this.getCommodities();
    
    this.getUserList();
    this.initForm();

    // if(this.sampleDetails.payment?.id) {
      // this.stepper.next();
      // this.stepper.selectedIndex = 2;
    // }
   }

  getSampleDetails() {
    this.distributedSample = {ch: [], bi: [], in:[]};
    let payload = {
      id: this.sampleId
    }
    this.service.getSampleDetails(payload).subscribe(res => {
      this.sampleDetails = res;
      console.log(res, 'HAHAHAH')

      res.parameters.forEach(p => {
        this.totalPrice = this.totalPrice+p.price;
        if(p.test_type === "Instrumental") {
          this.distributedSample.in.push(p);
        } else if(p.test_type === 'Microbiological') {
          this.distributedSample.bi.push(p);
        } else if(p.test_type === 'Chemical') {
          this.distributedSample.ch.push(p);
        }

        console.log(this.distributedSample, '()*^%')
      });
    })
  }

  getCommodityName(id) {
    let commodity = this.commodities.find(a => a.id === id);
    return commodity?.name
  }

  getCommodities() {
    let payload = {
      search: '',
      page: '',
      size:''
    }

    this.service.getCommodities(payload).subscribe(res =>{
      this.commodities = res.results;
    })
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 1000);
  }

  uploadImage(event) {
    let file = event.target.files[0];
    this.paymentReceipt = file;
    this.isPaymentReceipt = true;
  }

  payNow() {
    this.isPaymentProcceed = true;
    if (this.paymentForm.pristine || !this.isPaymentReceipt) {
      this.message = {};
      this.isPaymentProcceed = false;
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }

    let payload = {
      voucher_number: this.paymentForm.value.voucher_number,
      owner_email: this.sampleDetails?.owner_user?.email,
      sample_form: this.sampleDetails?.id,
      register_date: this.paymentForm.value.register_date,
      amount: this.paymentForm.value.amount
    }
    this.service.sampleRequestPayment(payload, this.paymentReceipt).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, res.message);
      this.dismissMessage();
      this.isPaymentProcceed = false;
      this.message = {};
      this.responseError = null;
      this.goToNextStep();
    },
    (error) => {
      window.scroll(0, 0)
      this.message = {};
      this.responseError = error?.error;
      this.isPaymentProcceed = false;
    })
  }

  ngAfterViewInit(): void {
    // this.validation();
    // this.assignFormValidation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.paymentForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  private assignFormValidation() {
    this.genericValidator
      .initValidationProcess(this.assignSampleForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }
}
