import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, delay } from 'rxjs';
import { ParameterService } from 'src/app/services/commodities/parameter/parameter.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { collectionInOut, rowsAnimation } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { ViewmultipleDetailsComponent } from './view-details/view-multiple-details';

@Component({
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.scss'],
  animations: [collectionInOut, rowsAnimation ],
})
export class ParameterComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'name', 'commodities','testType', 'price','testMethod','mandatoryStandards','formula','units', 'action'];
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

  existingId: any;

  parameterContains:any[] = [];

  //  for units fields
  get multipleUnits(): FormArray {
    return this.parameterForm.get('units') as FormArray;
  }

  addUnits() {
      this.multipleUnits.push(this.createUnits());
  }

  removeUnits() {
    this.multipleUnits.removeAt(-1)
  }

  createUnits() {
    return this.fb.group({
      id: new FormControl(''),
      units: new FormControl(''),
      units_nepali: new FormControl('')
    })
  }

// units

// for mandatory standards
get multipleStandards(): FormArray {
  return this.parameterForm.get('mandatory_standard') as FormArray;
}

addStandards() {
    this.multipleStandards.push(this.createStandards());
}

removeStandards() {
  this.multipleStandards.removeAt(-1)
}

createStandards() {
  return this.fb.group({
    id: new FormControl(''),
    mandatory_standard: new FormControl(''),
    mandatory_standard_nepali: new FormControl('')
  })
}
// mandatory standards

// test methodstest method
get multipleTestMethods(): FormArray {
  return this.parameterForm.get('test_method') as FormArray;
}

addTestMethod() {
    this.multipleTestMethods.push(this.createTestMethod());
}

removeTestMethod() {
  this.multipleTestMethods.removeAt(-1)
}

createTestMethod() {
  return this.fb.group({
    id: new FormControl(''),
    ref_test_method: new FormControl(''),
    // ref_test_method_nepali: new FormControl('')
  })
}

  constructor(
    public dialog: MatDialog,
    private sService: ParameterService,
    private cService: CommodityCategoryService,
    private fb: FormBuilder,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    this.route.queryParams
      .subscribe(params => {
        this.existingId = params['id'];
      });

    // console.log(this.route.snapshot.params['id'], 'pooooooooo')
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
      id: '',
      name: [''],
      test_type: [''],
      commodity: [''],
      ref_test_method: [''],
      // units: [''],
      // units_nepali: [''],
      // mandatory_standard: [''],
      // mandatory_standard_nepali: [''],
      price: [''],
      remarks: '.',
      formula: [''],
      formula_notation: [''],
      units:new FormArray([]),
      mandatory_standard: new FormArray([]),
      test_method: new FormArray([])
    })
  }

  viewMoreDetails(array,type) {
    let viewList = {
      values:array,
      type:type
    }
    this.dialog.open(ViewmultipleDetailsComponent, {
      data: viewList,
      minWidth:'400px'
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.addUnits();
    this.addStandards();
    this.addTestMethod();
    this.getParameters();
    this.getCommodityCategories();
    this.getCommodities();
    this.initFilterForm();

    // setTimeout(() => {
      if(this.existingId) {
        let payload = {
          id:this.existingId
        }
        // let pm
        this.sService.getIndividualParameter(payload).subscribe(res => {
          this.patchForm(res);
        })
        
      }
    // }, 5000);
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

  addNew() {
    this.router.navigate(['/dashboard/add/commodities-parameter'])
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
      this.parameterContains = res.results;      
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
    this.patchForm(data);
    window.scroll(0,0);
    this.router.navigate(['/dashboard/edit/commodities-parameter', data.id])
  }

  patchForm(data) {
    console.log(data, 'pwadij')
    // data?.mandatory_standard.forEach((element, index) => {
    //   if(data?.mandatory_standard) {
    //   this.addStandards();
    //   }
    // });
    for(let i=1; i<=data?.mandatory_standard.length-1; i++) {
      this.addStandards();
    }

    for(let i=1; i<=data?.units.length-1; i++) {
      this.addUnits();
    }

    for(let i=1; i<=data?.test_method.length-1; i++) {
      this.addTestMethod();
    }

    this.parameterForm.patchValue(
      {
        id: data?.id,
        name: data?.name,
        test_type: data?.test_type,
        commodity: data?.commodity?.id,
        test_method: data?.test_method,
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
    if (!this.parameterForm.valid) {
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

        this.parameterForm.setControl('units', new FormArray([]));
        this.addUnits();
    
        this.parameterForm.setControl('test_method', new FormArray([]));
        this.addTestMethod();
    
        this.parameterForm.setControl('mandatory_standard', new FormArray([]));
        this.addStandards();

        this.existingCategory = null;
        this.submitBtn = false
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

        this.parameterForm.setControl('units', new FormArray([]));
        this.addUnits();
    
        this.parameterForm.setControl('test_method', new FormArray([]));
        this.addTestMethod();
    
        this.parameterForm.setControl('mandatory_standard', new FormArray([]));
        this.addStandards();

        this.existingCategory = null;
        this.submitBtn = false;
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

    this.parameterForm.setControl('units', new FormArray([]));
    this.addUnits();

    this.parameterForm.setControl('test_method', new FormArray([]));
    this.addTestMethod();

    this.parameterForm.setControl('mandatory_standard', new FormArray([]));
    this.addStandards();
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
