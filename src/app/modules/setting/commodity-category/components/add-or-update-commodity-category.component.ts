import { Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './add-or-update-commodity-category.component.html',
  styleUrls:['../commodity-category.scss']
})
export class AddOrUpdateCommodityCategoryComponent implements OnInit {

  categoryForm: FormGroup;

  isLoading: boolean = true;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];
  existingCategory: any;

  message:any = {};
  responseError = null;
  formBtnLoading = false;
  
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddOrUpdateCommodityCategoryComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private sService: CommodityCategoryService,
    private fb: FormBuilder,
    private toast: ToastService
  ) { 

  }

  patchForm(data) {
    this.categoryForm.patchValue(
      {id: data.id, name: data.name,name_nepali:data.name_nepali })
      window.scroll(0,0)
  }

  ngOnInit(): void {
    this.initForm();

    if(this.data) {
      this.patchForm(this.data);
    }
   }

  private initForm() {

    this.categoryForm = this.fb.group({
      name: [''],
      name_nepali: [''],
      address: [''],
      reg_no: ['']
    })
  }

  saveChanges() {
    this.formBtnLoading = true;
    if (this.data?.id) {
      this.sService.updateCategory(this.categoryForm.value, this.data.id).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.dismissMessage();
        this.categoryForm.reset();
        this.categoryForm.clearValidators();
        this.existingCategory = null;

        this.message = {};
        this.responseError =null;
        this.formBtnLoading = false;
        this.dialogRef.close();
      }, (error) => {
        this.message = {};
      this.responseError = error.error;
      this.formBtnLoading = false;
      })
    } else {
      this.sService.addCategory(this.categoryForm.value).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.dismissMessage();
        this.categoryForm.reset();
        this.categoryForm.clearValidators();
        this.existingCategory = null;

        this.message = {};
        this.responseError = null;
        this.formBtnLoading = false;
        this.dialogRef.close();
      }, (error)=> {
        this.message = {};
        this.responseError = error.error;
        this.formBtnLoading = false;
      })
    }
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  reset() {
    this.categoryForm.reset();
  }

  close() {
    this.dialogRef.close();
  }
}
