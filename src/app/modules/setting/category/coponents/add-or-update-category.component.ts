import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { rowsAnimation } from 'src/app/shared/animations/animations';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './add-or-update-category.component.html',
  styleUrls: ['./add-or-update-category.component.scss'],
  animations: [rowsAnimation]
})
export class AddOrUpdateCategoryComponent implements OnInit, AfterViewInit {

  categoryForm: FormGroup;


  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  constructor(
    private dialogRef: MatDialogRef<AddOrUpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private sService: SettingsService
  ) {
    this.genericValidator = new GenericValidator({
      'name': {
        'required': 'Category Name is required.'
      },
      'address': {
        'required': 'Address is required.'
      },
      'reg_no': {
        'required': 'Registration No. is required.'
      }
    })
  }

  ngOnInit(): void {
    this.initForm();

    if (this.data?.name) {
      this.patchForm();
    }
  }

  patchForm() {
    this.categoryForm.patchValue(
      {
        name: this.data?.name,
        address: this.data?.address,
        reg_no: this.data?.reg_no
      })
  }

  private initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      reg_no: ['', Validators.required]
    })
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.categoryForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  saveChanges() {
    if (this.data?.id) {
      this.sService.updateCategory(this.categoryForm.value, this.data.id).subscribe(res => {
        this.dialogRef.close();
      })
    } else {
      this.sService.addCategory(this.categoryForm.value).subscribe(res => {
        this.dialogRef.close();
      })
    }
  }

  ngAfterViewInit(): void {
    this.validation();

  }
}
