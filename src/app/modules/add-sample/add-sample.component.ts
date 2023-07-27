import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
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

  loggedUser: any;

  purposeOfAnalysis: any[] = [
    { id: 1, name: 'Requested' },
    { id: 11, name: 'Export' },
  ]

  SampleTypes: any[] = [
    { id: 1, name: 'liquid' },
    { id: 11, name: 'solid' },
  ];

  mfd_np: any;
  bbd_np: any;
  eed_np: any;

  /** list of banks */
  protected banks: any[] = [
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

    // console.log(this.selection.selected, 'daear')

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
    return `${date.year} साल, ${date.month + 1} महिना, ${date.day} गते`;
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

  selectedParameters: any[] = [];

  dftqcDocs:any[] = [];

  clientCategories:any[] =[];

  existingParameters:any[] = [];

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private router: Router,
    private service: AddSampleService,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
    this.loggedUser = JSON.parse(localStorage.getItem('userDetails'));
    if (!this.userDetails.is_verified) {
      this.router.navigate(['/dashboard'])
    }
    this.getClientCategories();
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

  getClientCategories() {
    this.service.getCategories().subscribe(res => {
      this.clientCategories = res.results;
    })
  }

  getClientCategoryName(id) {
    return this.clientCategories?.find(a => a.id === id)?.name;

  }

  ngOnInit(): void {
    this.initForm();

    this.getCommodities();
    this.setUnits();
    this.getParametersOfCommodity();
    this.getBestDate();


    if (this.userDetails.role === 1 || this.userDetails.role === 2) {
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

  get samples(): FormArray {
    return this.addSampleForm.get('sampleDocuments') as FormArray;
  }

  addDocList() {
      this.samples.push(this.createDocList());
  }

  createDocList() {
    return this.fb.group({
      document_name: new FormControl(''),
      file: new FormControl('')
    })
  }

  getCommodities() {
    let payload = {
      search: '',
      page: '',
      size: 500
    }
    this.service.getCommodities(payload).subscribe(response => {
      this.commodities = response.results;
      if (this.sampleId) {
        this.getSampleDetails();
      }
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

  setUnits() {
    this.addSampleForm.get('sample_type').valueChanges.subscribe(a => {
      if (a === 'liquid') {
        this.addSampleForm.get('sample_units').setValue('ml');
      } else if (a === 'solid') {
        this.addSampleForm.get('sample_units').setValue('gm');
      }
    })
  }

  getSampleDetails() {
    this.service.getSampleDetails(this.sampleId).subscribe(response => {
      let actualResponse = response;
      // this.dataSource.data = response.parameters;

      this.existingParameters = response.parameters;

      let reqCommodity = response.commodity.id;

      // let/
      // console.log(this.commodities, "ALL COMPODITIES")
      let com = this.commodities.find(a => a.name = response.commodity.name);
      this.dataSource.data = com?.test_result;

      this.getParametersOfCommodity();

      let parameters = response.parameters;

      let actParameter = [];
      parameters.forEach(a => {
        if (a.id) {
          actParameter.push(a.id);
        }
      });
      actualResponse.parameters = actParameter;
      this.selectedParameters = actParameter;

      actualResponse.commodity = reqCommodity;
      actualResponse.isParameter = true;
      this.addSampleForm.patchValue(actualResponse);
      this.addSampleForm.value.isParameter = true

      // this.selection =new SelectionModel<any>(true, [actParameter]);
      // this.isAllSelected();

      // this.selection.clear();
      // if(e==1){
      // const CheckThisRow = this.dataSource.data.filter(x=>x.position==1)
      // this.selection.select(...CheckThisRow);
      // }
      // if(e==2){
      //   const CheckThisRow = this.dataSource.data.filter(x=>x.position==4)
      //    this.selection.select(...CheckThisRow);
      // }
      // console.log(this.addSampleForm.value,this.selection.selected, 'okoko')
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
      dfb: [''],
      batch: ['', Validators.required],
      brand: ['', Validators.required],
      purpose: ['', Validators.required],
      report_date: [''],
      amendments: [''],
      note: [''],
      commodity: ['', Validators.required],
      language: ['en'],
      parameters: [[]],
      owner_user: '',
      isParameter: false,
      status: 'pending',
      requested_export: ['requested'],
      sample_type: [''],
      sample_quantity: [''],
      sample_per_unit: [''],
      sample_units: '',
      sample_measurement: [''],
      number_of_sample: '',
      dfb_type: 'date',
      dfb_duration: '',
      days_dfb: '',
      client_sub_category:'',
      sampleDocuments: new FormArray([]),
      client_type:this.loggedUser.client_category
    })

    this.addDocList();
  }

  save() {
    console.log(this.addSampleForm.value, 'LOGIN...')

    let ok:any[] =[];
    this.addSampleForm.value.sampleDocuments.forEach((a, index) => {
      let obj = {document_name: a.document_name, file:this.dftqcDocs[index]}
      ok.push(obj);
    })
    console.log(ok, 'OK FILE..')
  }

  uploadImage(event) {
    let file = event.target.files[0];
    this.dftqcDocs.push(event.target.files[0]);
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
    if (this.addSampleForm.invalid) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isSampleSent = false;
      window.scroll(0, 0);
      return;
    }

    let cUser;
    let cOwner;
    if (this.userDetails.role === 5) {
      cUser = this.userDetails.email;
      cOwner = this.userDetails.id
    }
    if (this.userDetails.role !== 5 && this.addSampleForm.value.existing_user) {
      cUser = this.addSampleForm.value.existing_user.email;
      cOwner = this.addSampleForm.value.existing_user.id;

    } else {
      cUser = this.loggedUser.email,
        cOwner = this.loggedUser.id
    }

    if (this.bankCtrl.value) {
      cUser = this.bankCtrl.value.email;
    }

    // console.log(this.addSampleForm.value, 'oko')

    let images:any[] =[];
    this.addSampleForm.value.sampleDocuments.forEach((a, index) => {
      let obj = {document_name: a.document_name, file:this.dftqcDocs[index]}
      images.push(obj);
    })

    let dfbDate = '';
    if(this.addSampleForm.value.dfb) {
      dfbDate = this.addSampleForm.value.dfb;
    } else {
      dfbDate = ''
    }

    let payload = {
      id: this.sampleId,
      name: this.addSampleForm.value.name,
      condition: this.addSampleForm.value.condition,
      mfd: this.format(this.addSampleForm.value.mfd),
      dfb: dfbDate,
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
      owner: cOwner,
      sample_type: this.addSampleForm.value.sample_type,
      sample_quantity: this.addSampleForm.value.sample_quantity,
      sample_units: this.addSampleForm.value.sample_units,
      number_of_sample: this.addSampleForm.value.sample_per_unit,
      dfb_type: this.addSampleForm.value.dfb_type,
      dfb_duration: this.addSampleForm.value.dfb_duration,
      days_dfb: this.addSampleForm.value.days_dfb,
      client_category:{
        client_category:this.loggedUser.client_category,
        client_sub_category:this.addSampleForm.value.client_sub_category,
        image:images
      }

    }

    let payloadforImg = JSON.stringify(payload);
    let client_category = {}
    let myImage = []

    let p;
    if(this.addSampleForm.value.parameters.length > 0) {
    p =JSON.stringify(this.addSampleForm.value.parameters);
    } else {
      p = JSON.stringify([])
    }

    console.log(p, 'asdasd',this.addSampleForm.value.parameters)

    const formData = new FormData();
    formData.append('id', this.addSampleForm.value.id);
    formData.append('name', this.addSampleForm.value.name);
    formData.append('condition',this.addSampleForm.value.condition);
    formData.append('mfd',this.format(this.addSampleForm.value.mfd));
    formData.append('dfb', this.format(this.addSampleForm.value.dfb));
    formData.append('batch', this.addSampleForm.value.batch);
    formData.append('brand',this.addSampleForm.value.brand),
    formData.append('purpose', this.addSampleForm.value.purpose),
    formData.append('report_date', this.format(this.addSampleForm.value.report_date)),
    formData.append('amendments', this.addSampleForm.value.amendments),
    formData.append('note',this.addSampleForm.value.note),
    formData.append('commodity',this.addSampleForm.value.commodity),
    formData.append('language', this.addSampleForm.value.language),
    formData.set('parameters', p),
    formData.append('owner_user', cUser),
    formData.append('form_available', 'smu'),
    formData.append('status', 'pending'),

    formData.append('requested_export', this.addSampleForm.value.requested_export),
    formData.append('owner', cOwner),
    formData.append('sample_type', this.addSampleForm.value.sample_type),
    formData.append('sample_quantity', this.addSampleForm.value.sample_quantity),
    formData.append('sample_units',this.addSampleForm.value.sample_units),
    formData.append('number_of_sample',this.addSampleForm.value.number_of_sample),
    formData.append('dfb_type', this.addSampleForm.value.dfb_type),
    formData.append('dfb_duration', this.addSampleForm.value.dfb_duration),
    formData.append('days_dfb', this.addSampleForm.value.days_dfb),

    formData.append('client_category', this.loggedUser.client_category)
    formData.append('client_sub_category', this.addSampleForm.value.client_sub_category),

    images.forEach((image,index) => {
      formData.append(`images[file]`, image.file);
      formData.append(`images[name]`, image.document_name);
    })
    
    

    // formData.append('myObject', JSON.stringify(myObject));
    // formData.appendclient_category:{
    //   formData.appendclient_category:this.loggedUser.client_category,
    //     cleint_sub_category:this.addSampleForm.value.client_sub_category,
    //     image:images
    //   }

    console.log(payload, 'PAYLOAD', this.addSampleForm.value)
    if (this.sampleId) {

      this.service.updateSample(formData, this.sampleId).subscribe(res => {
        this.isSampleSent = false;
        if (this.userDetails.role === 5) {
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
      }, (error) => {
        window.scroll(0, 0)
        this.message = {};
        this.responseError = error?.error;
        this.isLoading = false;
        this.isSampleSent = false;
      })
    } else {
      this.service.addSample(formData).subscribe(response => {
        this.isSampleSent = false;
        if (this.userDetails.role === 5) {
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
      size: '',
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

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
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
        // this.singleSelect.compareWith = (a: any, b: any) => a && b && a?.first_name === b?.first_name;
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

