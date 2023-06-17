import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, delay } from 'rxjs';
import { ParameterService } from 'src/app/services/commodities/parameter/parameter.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { collectionInOut, rowsAnimation } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.scss'],
  animations: [collectionInOut, rowsAnimation ]
})
export class ParameterComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'name', 'commodities','testType', 'price','testMethod','mandatoryStandards','formula', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  isWorking = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  parameterForm: FormGroup;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];
  existingCategory: any;

  commodityCategories: any[] = [];

  listOfParameters: Observable<any>;

  commodities: any[] = [];

  filterForm: FormGroup;

  isLoading: boolean = true;

  message:any = {};
  responseError = null;
  submitBtn = false;

  loggedUserDetails:any;

  constructor(
    public dialog: MatDialog,
    private sService: ParameterService,
    private cService: CommodityCategoryService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.genericValidator = new GenericValidator({
      'name': {
        'required': 'Category Name is required.'
      },
      'test_type': {
        'required': 'Test Type is required.'
      },
      'commodity': {
        'required': 'Commodity Category is required.'
      },
      'ref_test_method': {
        'required': 'Test Method is required.'
      },
      'units': {
        'required': 'Units is required.'
      },
      'mandatory_standard': {
        'required': 'Mandatory Standard is required.'
      },
      'price': {
        'required': 'Price is required.'
      },
      'formula': {
        'required': 'Formula is required.'
      },
      'formula_notation': {
        'required': 'Formula Notation is required'
      }
    })
   }

  private initForm() {
    this.parameterForm = this.fb.group({
      // name: ['', Validators.required],
      // test_type: ['', Validators.required],
      // commodity_category: ['', Validators.required],
      // ref_test_method: ['', Validators.required],
      // units: ['', Validators.required],
      // mandatory_standard: ['', Validators.required],
      // price: ['', Validators.required],
      // remarks: '.',
      // formula: ['', Validators.required]

      id: '',

      name: [''],
      test_type: [''],
      commodity: [''],
      ref_test_method: [''],
      units: [''],
      mandatory_standard: [''],
      price: [''],
      remarks: '.',
      formula: [''],
      formula_notation: ['']
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getParameters();
    this.getCommodityCategories();
    this.getCommodities();
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      test_type: ''
    })
  }

  getCommodityCategories() {
    let payload = {
      search: '',
      page: '',
      size: ''
    }
    this.cService.getAllCommodityCategories(payload).subscribe(response => {
      this.commodityCategories = response.results;
    })
  }

  getCommodities() {
    let payload = {
      page: '',
      size: 500,
      search: ''
    }
    this.sService.getCommodities(payload).subscribe(res => {
      this.commodities = res.results;
    })
  }

  getParameters() {
    this.isLoading = true;
    let payload = {
      search: '',
      page: '1',
      size: '500',
      test_type: ''
    }
    this.sService.getParameters(payload).subscribe(res => {
      this.dataSource.data = res.results;
      this.listOfParameters = res.results;
      this.isLoading = false;
    })
  }

  filter() {
    this.isLoading = true;
    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: '',
      test_type: this.filterForm.value.test_type
    }
    this.sService.getParameters(payload).subscribe(res => {
      this.dataSource = res.results;
      this.listOfParameters = res.results;
      this.isLoading = false;
    })
  }

  download(type) {
    let payload = {
      report_name: 'parameter',
      report_type: type,
      report_lang: 'en'
    }

    this.sService.downloadReport(payload);
  }
  resetFilter() {
    this.filterForm.reset();
    this.getParameters();
    this.message = {};
    this.responseError = null;
  }

  displayFn(data: any): string {
    return data && data.name ? data.name : '';
  }

  openDialog(data) {
    this.existingCategory = data;
    this.patchForm(data)
  }

  patchForm(data) {
    this.parameterForm.patchValue(
      {
        id: data?.id,
        name: data?.name,
        test_type: data?.test_type,
        commodity: data?.commodity,
        ref_test_method: data?.ref_test_method,
        units: data?.units,
        mandatory_standard: data?.mandatory_standard,
        formula: data?.formula,
        price: data?.price,
        formula_notation: data?.formula_notation
      })
  }

  deleteCategory(id: number) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.sService.deleteParameter(id).pipe(delay(400)).subscribe(_ => {
          this.getParameters();
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveChanges() {
    this.submitBtn = true;
    if (this.parameterForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      window.scroll(0,0);
      this.submitBtn = false;
      return;
    }

    let payload = {
      test_type: this.parameterForm.value.test_type
    }
    if (this.existingCategory?.id) {
      this.sService.updateParameter(this.parameterForm.value, this.existingCategory.id).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getParameters();
        this.dismissMessage();
        this.parameterForm.reset();
        this.parameterForm.clearValidators();
        this.existingCategory = null;
      },
      (error) => {
        window.scroll(0,0);
        this.message = {};
        this.responseError = error.error;
        this.submitBtn = false;
      })
    } else {
      this.sService.addParameter(this.parameterForm.value).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getParameters();
        this.dismissMessage();
        this.parameterForm.reset();
        this.parameterForm.clearValidators();
        this.existingCategory = null;
      },
      (error) => {
        window.scroll(0,0);
        this.message = {};
        this.responseError = error.error;
        this.submitBtn = false;
      })
    }
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  reset() {
    this.parameterForm.reset();
    this.getParameters();
    this.getCommodityCategories();
    this.getCommodities();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.parameterForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }
}
