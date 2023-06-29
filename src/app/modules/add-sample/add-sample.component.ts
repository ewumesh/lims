import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

// Custom component(s)
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { collectionInOut, rowsAnimation } from 'src/app/shared/animations/animations';
import { AddSampleService } from 'src/app/services/add-sample/add-sample.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';

import { NepaliDate, DateFormatter } from 'angular-nepali-datepicker';


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
  maxDateMFD: any;
  maxDateB: any;
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
date: any;
  users = [];

  // isParameter = false

  // for parameter table
  displayedColumns: string[] = ['select', 'position', 'name', 'price'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  loggedUser:any;

  purposeOfAnalysis:any[] = [
    {id: 1, name: 'Requested'},
    {id: 11, name: 'Export'},
  ]

  SampleTypes:any[] = [
    {id: 1, name: 'liquid'},
    {id: 11, name: 'solid'},
  ];

  /** list of banks */
  protected banks: any[] = [
    // {name: 'Bank A (Switzerland)', id: 'A'},
    // {name: 'Bank B (Switzerland)', id: 'B'},
    // {name: 'Bank C (France)', id: 'C'},
    // {name: 'Bank D (France)', id: 'D'},
    // {name: 'Bank E (France)', id: 'E'},
    // {name: 'Bank F (Italy)', id: 'F'},
    // {name: 'Bank G (Italy)', id: 'G'},
    // {name: 'Bank H (Italy)', id: 'H'},
    // {name: 'Bank I (Italy)', id: 'I'},
    // {name: 'Bank J (Italy)', id: 'J'},
    // {name: 'Bank Kolombia (United States of America)', id: 'K'},
    // {name: 'Bank L (Germany)', id: 'L'},
    // {name: 'Bank M (Germany)', id: 'M'},
    // {name: 'Bank N (Germany)', id: 'N'},
    // {name: 'Bank O (Germany)', id: 'O'},
    // {name: 'Bank P (Germany)', id: 'P'},
    // {name: 'Bank Q (Germany)', id: 'Q'},
    // {name: 'Bank R (Germany)', id: 'R'}
  ];

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  //----------------------------

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

  formatter: DateFormatter = (date) => {
    return `${ date.year } साल, ${ date.month+1 } महिना, ${ date.day } गते`;
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
    this.loggedUser = JSON.parse(localStorage.getItem('userDetails'));
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

      'requested_export': {
        'required': 'This field is required.'
      }
      // 'note': {
      //   'required': 'Note is required.'
      // },

    })
  }

  ngOnInit(): void {
    this.initForm();

    this.getCommodities();
    this.setUnits();
    this.getParametersOfCommodity();
    this.getBestDate();
    if (this.sampleId) {
      this.getSampleDetails();
      // this.addSampleForm.value.isParameter = true;
    }

    if(this.userDetails.role === 1 || this.userDetails.role === 2) {
      this.getUsers();
    }

    // set initial selection
    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
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

  getBestDate() {
    this.addSampleForm.get('mfd').valueChanges.subscribe(res => {
      this.maxDateB = res;
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

  setUnits(){
    this.addSampleForm.get('sample_type').valueChanges.subscribe( a=> {
      if(a === 'liquid') {
        this.addSampleForm.get('sample_units').setValue('ml');
      } else if(a === 'solid') {
        this.addSampleForm.get('sample_units').setValue('gm');
      }
    })
  }

  getSampleDetails() {
    this.service.getSampleDetails(this.sampleId).subscribe(response => {
      let actualResponse = response;
      // this.dataSource.data = response.parameters;

      let reqCommodity = response.commodity.id;

      // let/

      let com = this.commodities.find(a => a.id = reqCommodity);
      // console.log(com, 'PO:')
      this.dataSource.data = com?.test_result;

      this.getParametersOfCommodity();
      console.log(com,response, 'TABLE DATA..')

      let parameters = response.parameters;

      let actParameter = [];
      parameters.forEach(a => actParameter.push(a.id));
      actualResponse.parameters = actParameter;

      actualResponse.commodity = reqCommodity;
      actualResponse.isParameter = true;
      this.addSampleForm.patchValue(actualResponse);
      this.addSampleForm.value.isParameter = true

      console.log(reqCommodity, 'popop')
    })
  }

  private initForm() {
    // let isParameter;
    // if(this.sampleId) {
    //   isParameter = true;
    // } else {
    //   isParameter = false;
    // }
    this.maxDateMFD = new Date();
    this.addSampleForm = this.fb.group({
      existing_user: [''],
      name: ['', Validators.required],
      condition: ['', Validators.required],
      mfd: [null, [Validators.required]],
      dfb: ['', Validators.required],
      batch: ['', Validators.required],
      brand: ['', Validators.required],
      purpose: ['', Validators.required],
      report_date: ['', Validators.required],
      amendments: [''],
      note: [''],
      commodity: ['', Validators.required],
      language: ['en'],
      parameters: [[]],
      owner_user: '',
      isParameter: false,
      status: 'pending',
      requested_export:['requested'],
      sample_type:[''],
      sample_quantity: [''],
      sample_perunit: [''],
      sample_units: '',
      sample_measurement: ['']
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
    let cOwner;
    if(this.userDetails.role === 5) {
    cUser = this.userDetails.email;
    cOwner = this.userDetails.id
    }
    if(this.userDetails.role !== 5 && this.addSampleForm.value.existing_user) {
      cUser = this.addSampleForm.value.existing_user.email;
      cOwner = this.addSampleForm.value.existing_user.id;

    } else {
      cUser = this.loggedUser.email,
      cOwner = this.loggedUser.id
    }

    if(this.bankCtrl.value) {
      cUser = this.bankCtrl.value.email;
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
      status: 'pending',
      requested_export: this.addSampleForm.value.requested_export,
      owner: cOwner
    }

    console.log(payload, 'PAYLOAD', this.addSampleForm.value)
    if(this.sampleId) {

      // this.service.updateSample(payload).subscribe(res => {
      //   this.isSampleSent = false;
      //   if(this.userDetails.role === 5) {
      //     this.router.navigate(['/dashboard/my-sample'])
      //   } else {
      //     this.router.navigate(['/dashboard/sample-requests']);
      //   }
      //   this.toast.showToast(
      //     TOAST_STATE.success,
      //     res?.message);
      //     this.dismissMessage();
      //     this.isLoading = true;
      //     this.message = {};
      //     this.responseError = null;
      // },(error) => {
      //   window.scroll(0, 0)
      //   this.message = {};
      //   this.responseError = error?.error;
      //   this.isLoading = false;
      //   this.isSampleSent = false;
      // })
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
      this.banks = res;
    })
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }


  ngAfterViewInit(): void {
    this.setInitialValue();
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

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a?.first_name === b?.first_name;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.first_name.toLowerCase().indexOf(search) > -1)
    );
  }
}

