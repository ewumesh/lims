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

  maxDate: any;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  sampleId: any;

  userDetails = JSON.parse(localStorage.getItem('userDetails'));

  commodities:any[] = [];

  commodityParameters: any[] = [];

  totalPrice = 0;
  priceOfCommodity: number = 0;


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
      totalPrice = totalPrice+a.price;

      selectedId.push(a.id);
      // }
    })
    this.addSampleForm.value.parameters = selectedId;
    this.totalPrice = totalPrice;

    console.log(totalPrice, 'TOTAL PRICE')
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
      'commodity_id': {
        'required': 'Commodity for Analysis is required.'
      },
      // 'note': {
      //   'required': 'Note is required.'
      // },

    })
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
      let parameters = this.commodities.find(x => x.id === id);
      this.priceOfCommodity = parameters.price
      this.commodityParameters = parameters.test_result;
      this.dataSource.data = parameters.test_result;
      this.isLoading = false;
      this.addSampleForm.value.isParameter = false;

    })
  }

  getSampleDetails() {
    this.service.getSampleDetails(this.sampleId).subscribe(response => {
      this.addSampleForm.patchValue(response);
      this.addSampleForm.disable();
    })
  }

  private initForm() {
    this.maxDate = new Date();
    this.addSampleForm = this.fb.group({
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
      commodity_id: ['', Validators.required],
      language: [''],
      parameters: [['Test']],
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
    if (this.addSampleForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }

    console.log(this.addSampleForm.value, 'VALUE..')

    let payload = {

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
      commodity_id: this.addSampleForm.value.commodity_id,
      language: this.addSampleForm.value.language,
      parameters: this.addSampleForm.value.parameters,
      owner_user: this.userDetails.email,
      form_available: 'smu',
      status: 'pending'
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
          // setTimeout(() => {
            this.dismissMessage();
          // }, 3000);
        } else {
          this.toast.showToast(
            TOAST_STATE.danger,
            error?.error?.message);

          // setTimeout(() => {
            this.dismissMessage();
          // }, 3000);
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
    const year = date?.getFullYear();
    const month = (date?.getMonth() + 1).toString().padStart(2, '0');
    const day = date?.getDate().toString().padStart(2, '0');
    const hours = date?.getHours().toString().padStart(2, '0');
    const minutes = date?.getMinutes().toString().padStart(2, '0');
    const seconds = date?.getSeconds().toString().padStart(2, '0');

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

