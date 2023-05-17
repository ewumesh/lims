import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

// Custom component(s)
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { rowsAnimation } from 'src/app/shared/animations/animations';
import { AddSampleService } from 'src/app/services/add-sample/add-sample.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.scss'],
  animations: [rowsAnimation]
})
export class AddSampleFormComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>();

  addSampleForm: FormGroup;
  isLoading: boolean;
  message: any;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  sampleId: any;

  userDetails = JSON.parse(localStorage.getItem('userDetails'));

  commodities:any[] = [];

  commodityParameters: any[] = [];

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private router: Router,
    private service: AddSampleService,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
    this.sampleId = this.route.snapshot.paramMap.get('id');

    this.title.setTitle('Add Sample - Laboratory Inventory Management System');

    // this.genericValidator = new GenericValidator({
    //   'sampleName': {
    //     'required': 'Sample Name is required.'
    //   },
    //   'sampleCondition': {
    //     'required': 'Sample Condition is required.'
    //   },
    //   'mfd': {
    //     'required': 'Manufactured is required.'
    //   },
    //   'bbd': {
    //     'required': 'Best before date is required.'
    //   },
    //   'batchOrLotNumber': {
    //     'required': 'Batch/Lot No is required.'
    //   },
    //   'brandName': {
    //     'required': 'Brand Name is required.'
    //   },
    //   'proposeOfAnalysis': {
    //     'required': 'Purpose of Analysis is required.'
    //   },
    //   'reportRequiredByDate': {
    //     'required': 'Report Required by Date is required.'
    //   },
    //   'commodityForAnalysis': {
    //     'required': 'Commodity for Analysis is required.'
    //   },
    //   'reportingLanguage': {
    //     'required': 'Reporting Language is required.'
    //   },

    // })
  }

  ngOnInit(): void {
    if(this.sampleId) {
    this.getSampleDetails();
    }
    this.getCommodities();
    this.initForm();
    this.getParametersOfCommodity();
  }

  getCommodities() {
    this.service.getCommodities().subscribe(response => {
      this.commodities = response.results;
    })
  }

  getParametersOfCommodity() {
    this.addSampleForm.get('commodity_id').valueChanges.subscribe(id => {
      let parameters = this.commodities.find(x => x.id === id)?.test_result;
      this.commodityParameters = parameters;
    })
  }

  getSampleDetails() {
    this.service.getSampleDetails(this.sampleId).subscribe(response => {
      this.addSampleForm.patchValue(response);
      this.addSampleForm.disable();
    })
  }

  private initForm() {
    this.addSampleForm = this.fb.group({
      name: [''],
      condition: [''],
      mfd: [''],
      dfb: [''],
      batch: [''],
      brand: [''],
      purpose: [''],
      report_date: [''],
      amendments: [''],
      note: [''],
      commodity_id: [''],
      language: [''],
      parameters: [['Test']],
      owner_user: ''
    })
  }

  saveChanges() {
    if (this.addSampleForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }

    let payload = {

      name: this.addSampleForm.value.name,
      condition: this.addSampleForm.value.condition,
      mfd: this.formatDate(this.addSampleForm.value.mfd, 'yyyy-MM-dd'),
      dfb: this.formatDate(this.addSampleForm.value.dfb, 'yyyy-MM-dd'),
      batch: this.addSampleForm.value.batch,
      brand: this.addSampleForm.value.brand,
      purpose: this.addSampleForm.value.purpose,
      report_date: this.formatDate(this.addSampleForm.value.report_date, 'yyyy-MM-dd'),
      amendments: this.addSampleForm.value.amendments,
      note: this.addSampleForm.value.note,
      commodity_id: this.addSampleForm.value.commodity_id,
      language: this.addSampleForm.value.language,
      parameters: this.addSampleForm.value.parameters,
      owner_user: this.userDetails.email,
      form_available: 'smu'
    }

    this.service.addSample(payload).subscribe(response => {
      this.router.navigate(['/dashboard/my-samples']);
      this.toast.showToast(
        TOAST_STATE.success,
        response?.message);

      this.dismissMessage();
      this.isLoading = true;
    },
      (error) => {
        console.log(error.status, 'ERROR..')
        if (error.status === 400) {
          this.toast.showToast(
            TOAST_STATE.danger,
            'Entered Data not Valid. Please check it once.');
          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        } else {
          this.toast.showToast(
            TOAST_STATE.danger,
            error?.error?.message);

          setTimeout(() => {
            this.dismissMessage();
          }, 3000);
        }
        this.isLoading = false;
      })

  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formatString = format
      .replace('yyyy', year.toString())
      .replace('MM', month)
      .replace('dd', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);

    return formatString;
  }


  ngAfterViewInit(): void {
    // this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.addSampleForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
