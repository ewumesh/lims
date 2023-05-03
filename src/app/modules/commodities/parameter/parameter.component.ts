import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { ParameterService } from 'src/app/services/commodities/parameter/parameter.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.scss'],
  animations: [collectionInOut]
})
export class ParameterComponent implements OnInit {
  displayedColumns: string[] = ['sn', 'name', 'commodities','testType', 'price', 'action'];
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

  constructor(
    public dialog: MatDialog,
    private sService: ParameterService,
    private cService: CommodityCategoryService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.genericValidator = new GenericValidator({
      'name': {
        'required': 'Category Name is required.'
      }
    })
   }

  private initForm() {
    this.parameterForm = this.fb.group({
      name: ['', Validators.required],
      test_type: '',
      parent_commodity: '',
      ref_test_method: '',
      unit: '',
      mandatory_standard: '',
      parameter_price: '',
      address: [''],
      reg_no: [''],
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.getCommodityCategories();
  }

  getCommodityCategories() {
    this.cService.getAllCommodityCategories().subscribe(response => {
      this.commodityCategories = response.results;
    })
  }

  getCategories() {
    this.sService.getCategories().subscribe(res => {
      this.dataSource.data = res;
    })
  }

  openDialog(data) {
    this.existingCategory = data;
    this.patchForm(data);
    // console.log(data, 'data..')
    // let instance: MatDialogRef<AddOrUpdateCommodityCategoryComponent, any>;
    // instance = this.dialog.open(AddOrUpdateCommodityCategoryComponent, {
    //   width:'500px',
    //   data: data ? data : {},
    //   autoFocus: false,
    // });

    // instance.afterClosed().subscribe(result => {
    //   this.getCategories();
    // });
  }

  patchForm(data) {
    this.parameterForm.patchValue(
      { name: data.name })
  }

  deleteCategory(id: number) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.sService.deleteCategory(id).pipe(delay(400)).subscribe(_ => {
          this.getCategories();
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveChanges() {

    let payload = {
      test_type: this.parameterForm.value.test_type
    }
    if (this.existingCategory?.id) {
      this.sService.updateCategory(this.parameterForm.value, this.existingCategory.id).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getCategories();
        this.dismissMessage();
        this.parameterForm.reset();
        this.parameterForm.clearValidators();
        this.existingCategory = null;
      })
    } else {
      console.log(this.parameterForm.value, "PARAAMETER VALUES")
      this.sService.addCategory(this.parameterForm.value).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getCategories();
        this.dismissMessage();
        this.parameterForm.reset();
        this.parameterForm.clearValidators();
        this.existingCategory = null;
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
