import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

// Custom component(s)
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { collectionInOut, rowsAnimation } from 'src/app/shared/animations/animations';
import { AddSampleService } from 'src/app/services/add-sample/add-sample.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.scss'],
  animations: [rowsAnimation, collectionInOut]
})
export class AddSampleFormComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>();

  addSampleForm: FormGroup;
  isLoading: boolean = true;
  message: any;

  isSampleSent = false;

  maxDate: any;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  sampleId: any;

  userDetails = JSON.parse(localStorage.getItem('userDetails'));

  commodities: any[] = [];

  commodityParameters: any[] = [];

  totalPrice = 0;
  priceOfCommodity: number = 0;

  responseError = null;

  users = [];

  // isParameter = false

  // for parameter table
  displayedColumns: string[] = ['select', 'position', 'name', 'price'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    let totalPrice = 0;
    let selectedId = []

    this.selection.selected.forEach(a => {
      // if(a) {
      totalPrice = totalPrice + a?.price;

      selectedId.push(a.id);
      // }
    })
    this.addSampleForm.value.parameters = selectedId;
    this.totalPrice = totalPrice;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  //

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private router: Router,
    private service: AddSampleService,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
    if(!this.userDetails.is_verified) {
      this.router.navigate(['/dashboard'])
    }
    this.sampleId = this.route.snapshot.paramMap.get('id');

    this.title.setTitle('Add Sample - Laboratory Information Management System');

    this.genericValidator = new GenericValidator({
      'name': {
        'required': 'Sample Name is required.'
      },
      'condition': {
        'required': 'Sample Condition is required.'
      },
      'mfd': {
        'required': 'Manufactured is required.'
      },
      'dfb': {
        'required': 'Best before date is required.'
      },
      'batch': {
        'required': 'Batch/Lot No is required.'
      },
      'brand': {
        'required': 'Brand Name is required.'
      },
      'purpose': {
        'required': 'Purpose of Analysis is required.'
      },
      'report_date': {
        'required': 'Report Required by Date is required.'
      },
      'commodity': {
        'required': 'Commodity for Analysis is required.'
      },
      // 'note': {
      //   'required': 'Note is required.'
      // },

    })
  }

  ngOnInit(): void {

    this.getCommodities();
    this.initForm();
    this.getParametersOfCommodity();
    if (this.sampleId) {
      this.getSampleDetails();
      // this.addSampleForm.value.isParameter = true;
    }

    if(this.userDetails.role === 1 || this.userDetails.role === 2) {
      this.getUsers();
    }
  }

  getCommodities() {
    let payload = {
      search: '',
      page: '',
      size: 500
    }
    this.service.getCommodities(payload).subscribe(response => {
      this.commodities = response.results;
    })
  }

  getParametersOfCommodity() {
    this.addSampleForm.get('commodity').valueChanges.subscribe(id => {
      let parameters = this.commodities.find(x => x.id === id);
      this.priceOfCommodity = parameters?.price
      this.commodityParameters = parameters?.test_result;
      this.dataSource.data = parameters?.test_result;
      this.isLoading = false;

    })
  }

  getSampleDetails() {
    this.service.getSampleDetails(this.sampleId).subscribe(response => {
      this.addSampleForm.patchValue(response);
      // console.log(response, 'ok')
      // this.dataSource.data = response.parameters;
      // let sel: SelectionModel<any>
      // this.selection.selected = response.parameters
      // this.addSampleForm.disable();

    })
  }

  private initForm() {
    // let isParameter;
    // if(this.sampleId) {
    //   isParameter = true;
    // } else {
    //   isParameter = false;
    // }
    this.maxDate = new Date();
    this.addSampleForm = this.fb.group({
      existing_user: [''],
      name: ['', Validators.required],
      condition: ['', Validators.required],
      mfd: ['', [Validators.required]],
      dfb: ['', Validators.required],
      batch: ['', Validators.required],
      brand: ['', Validators.required],
      purpose: ['', Validators.required],
      report_date: ['', Validators.required],
      amendments: [''],
      note: [''],
      commodity: [[], Validators.required],
      language: ['en'],
      parameters: [[]],
      owner_user: '',
      isParameter: false,
      status: 'pending'
    })
  }

  disableFutureDatesFilter(date: Date | null): boolean {
    const currentDate = new Date();
    // Disable current date and future dates
    return date && date <= currentDate;
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  saveChanges() {
    this.isSampleSent = true;
    if (this.addSampleForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isSampleSent = false;
      window.scroll(0, 0);
      return;
    }

    let cUser;
    if(this.userDetails.role === 5) {
    cUser = this.userDetails.email;
    }
    if(this.userDetails.role !== 5 && this.addSampleForm.value.existing_user) {
      cUser = this.addSampleForm.value.existing_user
    } else {
      cUser = this.userDetails.email
    }

    // console.log(this.addSampleForm.value, 'oko')

    let payload = {
      id: this.sampleId,
      name: this.addSampleForm.value.name,
      condition: this.addSampleForm.value.condition,
      mfd: this.format(this.addSampleForm.value.mfd),
      dfb: this.format(this.addSampleForm.value.dfb),
      batch: this.addSampleForm.value.batch,
      brand: this.addSampleForm.value.brand,
      purpose: this.addSampleForm.value.purpose,
      report_date: this.format(this.addSampleForm.value.report_date),
      amendments: this.addSampleForm.value.amendments,
      note: this.addSampleForm.value.note,
      commodity: this.addSampleForm.value.commodity,
      language: this.addSampleForm.value.language,
      parameters: this.addSampleForm.value.parameters,
      owner_user: cUser,
      form_available: 'smu',
      status: 'pending'
    }

    if(this.sampleId) {
      this.service.updateSample(payload).subscribe(res => {
        this.isSampleSent = false;
        if(this.userDetails.role === 5) {
          this.router.navigate(['/dashboard/my-sample'])
        } else {
          this.router.navigate(['/dashboard/sample-requests']);
        }
        this.toast.showToast(
          TOAST_STATE.success,
          res?.message);
          this.dismissMessage();
          this.isLoading = true;
          this.message = {};
          this.responseError = null;
      },(error) => {
        window.scroll(0, 0)
        this.message = {};
        this.responseError = error?.error;
        this.isLoading = false;
        this.isSampleSent = false;
      })
    } else {
    this.service.addSample(payload).subscribe(response => {
      this.isSampleSent = false;
      if(this.userDetails.role === 5) {
        this.router.navigate(['/dashboard/my-sample'])
      } else {
        this.router.navigate(['/dashboard/sample-requests']);
      }
      this.toast.showToast(
        TOAST_STATE.success,
        response?.message);

      this.dismissMessage();
      this.isLoading = true;
      this.message = {};
      this.responseError = null;
    },
      (error) => {
        window.scroll(0, 0)
        this.message = {};
        this.responseError = error?.error;
        this.isLoading = false;
        this.isSampleSent = false;
      })
    }

  }

  getUsers() {
    let payload = {
      page: '',
      size:'',
      search: '',
      role: '5',
      client_category_id: ''
    }
    this.service.getUsersList(payload).subscribe(res => {
      this.users = res;
    })
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }


  ngAfterViewInit(): void {
    this.validation();
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

