import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatter } from 'angular-nepali-datepicker';
import { report } from 'process';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

import { LicensingAddSampleService } from 'src/app/services/dftqc/service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import {
  TOAST_STATE,
  ToastService,
} from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './ap-add-sample.component.html',
  styleUrls: ['./ap-add-sample.scss'],
  animations: [collectionInOut],
})
export class ApAddSampleComponent implements OnInit, AfterViewInit {
  // for sample form..
  apAddSampleForm: FormGroup;

  // loading sample submit button
  isSampleSent = false;

  //  display client validation error message
  message: any = {};

  // handle response errors
  responseError = null;

  SampleTypes: any[] = [
    { id: 1, name: 'liquid' },
    { id: 11, name: 'solid' },
  ];

  commodities: any[] = [];

  commoditiesParameters: any[] = [];

  // commodity search
  /** list of commodities */
  protected allCommodities: any[] = [];

  /** control for the selected bank */
  public cCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public cFilterCtrl: FormControl = new FormControl();

  /** list of commodities filtered by search keyword */
  public filteredCommodities: ReplaySubject<any[]> = new ReplaySubject<any[]>(
    1
  );

  @ViewChild('singleSelectC') singleSelectC: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected onDestroy = new Subject<void>();

  // for parameter table
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  loggedUser: any;

  dftqcDocs: any[];

  commodityWisePrice = 0;
  parameterWisePrice = 0;

  // For Edit sample
  sampleId;
  selectedParameters: any[];
  selectedCommodity: any;

  sampleDetails: any;

  bbd_date = '';
  mfd_date = '';
  voucher_paid_date = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private service: LicensingAddSampleService
  ) {
    this.loggedUser = JSON.parse(localStorage.getItem('userDetails'));
    this.sampleId = this.route.snapshot.paramMap.get('id');

    if (this.sampleId) {
      this.getSampleDetails();
    }
  }

  ngOnInit(): void {
    this.getCommodities();
    this.getSelectedCommodityParameters();
    this.initapAddSampleForm();
    this.setUnits();
    this.setTableHeader();
  }

  getSampleDetails() {
    this.service.getSampleDetails(this.sampleId).subscribe((response) => {
      setTimeout(() => {
        this.manipulateSampleDetails(response);
      }, 3000);
    });
  }

  manipulateSampleDetails(response) {
    let formValue = response;
    this.sampleDetails = response;
    if (response && this.commodities.length > 0) {
      let selectedCommodity = this.commodities.find(
        (a) => a.id === response.commodity.id
      );
      this.dataSource.data = selectedCommodity?.test_result;
      // console.log(selectedCommodity, this.commodities.find(a => a.id === response.commodity.id), 'OLK')
    }

    this.selectedCommodity = this.commodities.find(
      (a) => a.id === response.commodity.id
    );

    this.commodityWisePrice = response.price;
    this.parameterWisePrice = response?.price;
    if (formValue.analysis_pricing === true) {
      formValue.analysis_pricing = 1;
      // this.parameterWisePrice = response?.price;;
    } else {
      formValue.analysis_pricing = 0;
      // this.commodityWisePrice = response?.price;
    }

    // this.cCtrl = new FormControl({id:111, name:'oooooooo'});

    // /** control for the MatSelect filter keyword */
    // this.cFilterCtrl = new FormControl(this.selectedCommodity);

    this.selectedParameters = response.parameters;
    this.cCtrl.setValue(this.selectedCommodity);

    const mfdString = formValue.mfd.split('-');
    let dfbString;
    if (formValue?.dfb) {
      dfbString = formValue?.dfb.split('-');
    }

    const VoucherDateString = formValue.voucher_date.split('-');

    let mfd: any = {};
    let dfb: any = {};
    let voucher_date: any = {};

    if (mfdString.length === 3) {
      mfd.year = parseInt(mfdString[0], 10);
      mfd.month = parseInt(mfdString[1], 10);
      mfd.day = parseInt(mfdString[2], 10);
    } else {
      console.error('Invalid date format');
    }

    // if (dfbString && dfbString.length === 3) {
    //     dfb.year = parseInt(dfbString[0], 10);
    //     dfb.month = parseInt(dfbString[1], 10);
    //     dfb.day = parseInt(dfbString[2], 10);
    //   } else {
    //     console.error('Invalid date format');
    //   }

    if (VoucherDateString.length === 3) {
      voucher_date.year = parseInt(VoucherDateString[0], 10);
      voucher_date.month = parseInt(VoucherDateString[1], 10);
      voucher_date.day = parseInt(VoucherDateString[2], 10);
    } else {
    }

    formValue.mfd = mfd;
    formValue.dfb = dfb;
    formValue.voucher_date = voucher_date;

    this.apAddSampleForm.patchValue(formValue);
  }

  setTableHeader() {
    this.apAddSampleForm
      .get('analysis_pricing')
      .valueChanges.subscribe((res) => {
        if (res === 0) {
          this.displayedColumns = ['select', 'position', 'name'];
        } else {
          this.displayedColumns = ['select', 'position', 'name', 'price'];
        }
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    // console.log(this.selection.selected, 'daear')

    let totalPrice = 0;
    let selectedId = [];

    this.selection.selected.forEach((a) => {
      // if(a) {
      totalPrice = totalPrice + a?.price;

      selectedId.push(a.id);
      // }
    });
    this.parameterWisePrice = 0;
    // this.apAddSampleForm.value.parameters = selectedId;
    this.parameterWisePrice = totalPrice;

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  formatter: DateFormatter = (date) => {
    let month;
    let days;
    if (date.month < 10) {
      month = '0' + (date.month + 1).toString();
    } else {
      month = date.month;
    }

    if (date.day < 10) {
      days = '0' + date.day.toString();
    } else {
      days = date.day;
    }
    return `${date.year}-${month}-${days}`;
    // return `${date.year}- ${date.month + 1} - ${date.day}`;
  };

  getSelectedCommodityParameters() {
    this.cCtrl.valueChanges.subscribe((a) => {
      console.log(a, 'iooooo');
      this.selectedCommodity = a;
      this.commodityWisePrice = a.price;
      this.commodityWisePrice = 0;
      this.commoditiesParameters = a.test_result;
      this.dataSource.data = a.test_result;
    });
  }

  setUnits() {
    this.apAddSampleForm.get('sample_type').valueChanges.subscribe((a) => {
      if (a === 'liquid') {
        this.apAddSampleForm.get('sample_units').setValue('ml');
      } else if (a === 'solid') {
        this.apAddSampleForm.get('sample_units').setValue('gm');
      }
    });
  }

  initapAddSampleForm() {
    this.apAddSampleForm = this.fb.group({
      mfd: '',
      sample_category: '',
      sample_symbol_number: '',
      analysis_fee: '',
      voucher_number: '',
      voucher_date: '',

      existing_user: [''],
      name: [''],
      condition: [''],
      dfb: [''],
      batch: [''],
      brand: [''],
      purpose: [''],
      report_date: [''],
      amendments: [''],
      note: [''],
      commodity: [''],
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
      client_sub_category: 'licensing',
      sampleDocuments: new FormArray([]),
      client_type: this.loggedUser.client_category,
      analysis_pricing: 0,
    });
  }

  getCommodities() {
    let payload = {
      search: '',
      page: '',
      size: 500,
    };
    this.service.getCommoditiesLimited(payload).subscribe((response) => {
      this.commodities = response;
      this.allCommodities = response;
      this.filteredCommodities.next(
        this.allCommodities.filter(
          (a) => a.name.toLowerCase().indexOf('a') > -1
        )
      );
      // this.filterCommodities = response;
    });
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  saveChanges() {
    console.log(
      this.apAddSampleForm.value,
      this.mfd_date,
      this.bbd_date,
      this.voucher_paid_date,
      'OK CHA'
    );
    this.isSampleSent = true;

    let selectedParameters = this.selection.selected;

    let payloadParameters: any[] = [];
    selectedParameters.forEach((a) => {
      payloadParameters.push(a.id);
    });
    let finalPayloadParameters;
    if (payloadParameters.length > 0) {
      finalPayloadParameters = JSON.stringify(payloadParameters);
    } else {
      finalPayloadParameters = JSON.stringify([]);
    }

    console.log(payloadParameters, 'TOP');

    let dfbDate = '';
    if (this.apAddSampleForm.value.dfb) {
      dfbDate = this.apAddSampleForm.value.dfb;
    } else {
      dfbDate = '';
    }

    let images: any[] = [];
    this.apAddSampleForm.value.sampleDocuments.forEach((a, index) => {
      let obj = { document_name: a.document_name, file: this.dftqcDocs[index] };
      images.push(obj);
    });

    let p;
    if (this.apAddSampleForm.value.parameters.length > 0) {
      p = JSON.stringify(this.apAddSampleForm.value.parameters);
    } else {
      p = JSON.stringify([]);
    }

    const formData = new FormData();
    // formData.append('id', this.apAddSampleForm.value.id);
    // formData.append('name', this.apAddSampleForm.value.name);
    // formData.append('condition', this.apAddSampleForm.value.condition);

    if (this.apAddSampleForm.value.mfd) {
      formData.append('mfd', this.formatter(this.apAddSampleForm.value.mfd));
    } else {
      formData.append('mfd', '');
    }

    if (this.apAddSampleForm.value.dfb) {
      formData.append('dfb', this.formatter(this.apAddSampleForm.value.dfb));
    } else {
      formData.append('dfb', '');
    }

    let reportDate = '';
    if (this.apAddSampleForm.value.report_date) {
      this.format(this.apAddSampleForm.value.report_date);
    } else {
      reportDate = '';
    }

    formData.append('amendments', this.apAddSampleForm.value.amendments);
    formData.append('note', this.apAddSampleForm.value.note);

    if (this.sampleId) {
      formData.append('commodity', this.selectedCommodity.id);
    } else {
      formData.append('commodity', this.cCtrl.value.id);
    }

    formData.append('language', this.apAddSampleForm.value.language),
      formData.set('parameters', finalPayloadParameters);

    if (this.sampleId) {
      formData.append('owner_user', this.sampleDetails?.owner_user?.email);
    } else {
      formData.append('owner_user', this.loggedUser.email);
    }

    formData.append('form_available', 'smu'),
      formData.append('status', 'pending'),
      formData.append(
        'requested_export',
        this.apAddSampleForm.value.requested_export
      );
    if (this.sampleId) {
      formData.append('owner', this.sampleDetails?.owner_user?.id);
    } else {
      formData.append('owner', this.loggedUser.id);
    }
    formData.append('sample_type', this.apAddSampleForm.value.sample_type),
      formData.append(
        'sample_quantity',
        this.apAddSampleForm.value.sample_quantity
      ),
      formData.append('sample_units', this.apAddSampleForm.value.sample_units),
      formData.append(
        'number_of_sample',
        this.apAddSampleForm.value.number_of_sample
      ),
      formData.append('dfb_type', this.apAddSampleForm.value.dfb_type),
      formData.append('dfb_duration', this.apAddSampleForm.value.dfb_duration),
      formData.append('days_dfb', this.apAddSampleForm.value.days_dfb),
      formData.append('client_category', this.loggedUser.client_category);
    formData.append(
      'client_sub_category',
      this.apAddSampleForm.value.client_sub_category
    ),
      formData.append('analysis_fee', this.apAddSampleForm.value.analysis_fee),
      formData.append(
        'voucher_number',
        this.apAddSampleForm.value.voucher_number
      );

    if (this.apAddSampleForm.value.voucher_date) {
      formData.append(
        'voucher_date',
        this.formatter(this.apAddSampleForm.value.voucher_date)
      );
    } else {
      formData.append('voucher_date', '');
    }

    formData.append(
      'analysis_pricing',
      this.apAddSampleForm.value.analysis_pricing
    );

    // images.forEach((image, index) => {
    //     formData.append(`images[file]`, image.file);
    //     formData.append(`images[name]`, image.document_name);
    // })

    if (this.sampleId) {
      this.service.updateSample(formData, this.sampleId).subscribe(
        (res) => {
          this.toast.showToast(TOAST_STATE.success, res.message);
          this.dismissMessage();
          this.isSampleSent = false;
          this.message = {};
          this.responseError = null;

          if (this.loggedUser.role === 5) {
            this.router.navigate(['/dashboard/my-sample']);
          } else {
            this.router.navigate(['/dashboard/sample-requests']);
          }
        },
        (error) => {
          window.scroll(0, 0);
          this.message = {};
          this.responseError = error?.error;
          this.isSampleSent = false;
        }
      );
    } else {
      this.service.addSample(formData).subscribe(
        (res) => {
          this.toast.showToast(TOAST_STATE.success, res.message);
          this.dismissMessage();
          this.isSampleSent = false;
          this.message = {};
          this.responseError = null;

          if (this.loggedUser.role === 5) {
            this.router.navigate(['/dashboard/my-sample']);
          } else {
            this.router.navigate(['/dashboard/sample-requests']);
          }
        },
        (error) => {
          window.scroll(0, 0);
          this.message = {};
          this.responseError = error?.error;
          this.isSampleSent = false;
        }
      );
    }
  }

  dismissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 3000);
  }

  ngAfterViewInit(): void {
    // load the initial bank list
    this.filteredCommodities.next(this.allCommodities.slice());

    // listen for search field value changes
    this.cFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterCommodities();
      });
  }

  protected filterCommodities() {
    if (!this.allCommodities) {
      return;
    }
    // get the search keyword
    let search = this.cFilterCtrl.value;
    if (!search) {
      this.filteredCommodities.next(this.allCommodities.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCommodities.next(
      this.allCommodities.filter(
        (a) => a.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
