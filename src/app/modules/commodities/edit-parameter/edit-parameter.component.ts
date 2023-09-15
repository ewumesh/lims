import { Component, ElementRef, ViewChildren } from "@angular/core";
import { FormGroup, FormControlName, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ParameterService } from "src/app/services/commodities/parameter/parameter.service";
import { CommodityCategoryService } from "src/app/services/settings/commodity-category/commodity-category.service";
import { ToastService, TOAST_STATE } from "src/app/shared/toastr/toastr.service";
import { GenericValidator } from "src/app/shared/validators/generic-validators";



@Component({
templateUrl:'./edit-parameter.component.html',
styleUrls:['./edit-parameter.scss']
})

export class EditParameterCompopnent {
    parameterForm: FormGroup;

    // Used for form validation
genericValidator: GenericValidator;
displayMessage: any = {};
@ViewChildren(FormControlName, { read: ElementRef })
private formInputElements: ElementRef[];

message:any = {};
responseError = null;
submitBtn = false;

listOfParameters:any[] =[];
commodities:any[] =[];
isLoading = false;
commodityCategories: any[] =[];

  constructor(
      private fb: FormBuilder,
      private toast: ToastService,
      private sService: ParameterService,
  private cService: CommodityCategoryService,
  private route: ActivatedRoute,
  private router: Router
      ) { }

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

  patchForm(data) {
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

  getParameters() {
      this.isLoading = true;
      let payload = {
        search: '',
        page: '1',
        size: 800,
        test_type: ''
      }
      this.sService.getParameters(payload).subscribe(res => {
        this.listOfParameters = res.results;
        this.isLoading = false;
      })
    }

    getCommodities() {
      let payload = {
        page: '',
        size: 800,
        search: ''
      }
      this.sService.getCommodities(payload).subscribe(res => {
        this.commodities = res.results;
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

    ngOnInit(): void {
      this.initForm();
      this.addUnits();
      this.addStandards();
      this.addTestMethod();
      this.getParameters();
      this.getCommodityCategories();
      this.getCommodities();

      let id =this.route.snapshot.params['id'];
      if(id) {
        let payload = {
          id:id
        }
        // let pm
        this.sService.getIndividualParameter(payload).subscribe(res => {
          this.patchForm(res);
        })
        
      }
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
      let id =this.route.snapshot.params['id'];
      if (id) {
        this.sService.updateParameter(this.parameterForm.value, id).subscribe(res => {
          this.toast.showToast(
            TOAST_STATE.success,
            res.message);
          this.dismissMessage();
          this.parameterForm.reset();
          this.parameterForm.clearValidators();
  
          this.parameterForm.setControl('units', new FormArray([]));
          this.addUnits();
      
          this.parameterForm.setControl('test_method', new FormArray([]));
          this.addTestMethod();
      
          this.parameterForm.setControl('mandatory_standard', new FormArray([]));
          this.addStandards();
  
          this.submitBtn = false;
          this.router.navigate(['/dashboard/commodities-parameter'])
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
          this.dismissMessage();
          this.parameterForm.reset();
          this.parameterForm.clearValidators();
  
          this.parameterForm.setControl('units', new FormArray([]));
          this.addUnits();
      
          this.parameterForm.setControl('test_method', new FormArray([]));
          this.addTestMethod();
      
          this.parameterForm.setControl('mandatory_standard', new FormArray([]));
          this.addStandards();
  
          this.submitBtn = false;
          this.router.navigate(['/dashboard/commodities-parameter'])
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
  
      this.parameterForm.setControl('units', new FormArray([]));
      this.addUnits();
  
      this.parameterForm.setControl('test_method', new FormArray([]));
      this.addTestMethod();
  
      this.parameterForm.setControl('mandatory_standard', new FormArray([]));
      this.addStandards();
    }
  
    ngAfterViewInit() {
      // this.validation();
    }
  
    private validation() {
      this.genericValidator
        .initValidationProcess(this.parameterForm, this.formInputElements)
        .subscribe({ next: m => this.displayMessage = m });
    }

}