import { Component, ElementRef, Inject, OnInit, ViewChildren } from "@angular/core";
import { FormGroup, FormControlName, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddOrUpdateCommodityCategoryComponent } from "src/app/modules/setting/commodity-category/components/add-or-update-commodity-category.component";
import { CommoditiesService } from "src/app/services/commodities/commodities/commodities.service";
import { CommodityCategoryService } from "src/app/services/settings/commodity-category/commodity-category.service";
import { TOAST_STATE, ToastService } from "src/app/shared/toastr/toastr.service";
import { GenericValidator } from "src/app/shared/validators/generic-validators";



@Component({
    templateUrl:'./add-commodity.component.html',
    styleUrls:['./add-commodity.component.scss']
})

export class AddCommodityComponent implements OnInit {
    commoditiesForm: FormGroup;

  filterForm: FormGroup;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];
  existingCategory: any;

  commodityCategories: any[] = [];

  isLoading: boolean = true;

  message: any = {};
  responseError = null;
  submitBtn = false;

  constructor(
    public dialog: MatDialog,
    private sService: CommoditiesService,
    private cService: CommodityCategoryService,
    private fb: FormBuilder,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddCommodityComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    ) {

  }


  private initForm() {
    this.commoditiesForm = this.fb.group({
      name: [''],
      name_nepali: [''],
      category: [''],
      test_duration: [''],
      test_duration_nepali: [''],
      price: '',
      price_nepali: ''
      // units: ''
    })
  }

  saveChanges() {
    this.message = {};
    this.responseError = null;
    this.submitBtn = true;
    if (this.commoditiesForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      window.scroll(0,0);
      this.submitBtn = false;
      return;
    }
    if (this.data?.id) {
      this.sService.updateCommodity(this.commoditiesForm.value, this.data.id).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
          this.commoditiesForm.reset();
          this.commoditiesForm.clearValidators();
          this.existingCategory = null;
          this.submitBtn = false;
          this.dialogRef.close();
          this.dismissMessage();
      }, (error) => {
        window.scroll(0, 0);
        this.message = {};
        this.responseError = error.error;
        this.submitBtn = false;
      })
    } else {
      this.sService.addCommodity(this.commoditiesForm.value).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.commoditiesForm.reset();
        this.commoditiesForm.clearValidators();
        this.existingCategory = null;
        this.dismissMessage();


        this.message = {};
        this.responseError = null;
        this.submitBtn = false;
        this.dialogRef.close();
      }, (error) => {
        window.scroll(0, 0);
        this.message = {};
        this.responseError = error.error;
        this.submitBtn = false;
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
      // this.isLoading = false;
    })
  }


  reset() {
    this.commoditiesForm.reset();
  }

  close() {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
      this.initForm();
      this.getCommodityCategories();

      if(this.data) {
        this.patchForm(this.data);
      }
  }

  patchForm(data) {
    this.commoditiesForm.patchValue(
      {
        id: data?.id,
        name: data.name,
        category: data.category,
        test_duration: data.test_duration,
        units: data.units,
        price: data.price,
        name_nepali: data.name_nepali
      }
    )
    window.scroll(0,0);
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }
}