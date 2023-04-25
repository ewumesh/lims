import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddOrUpdateCategoryComponent } from './coponents/add-or-update-category.component';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { delay } from 'rxjs';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { rowsAnimation } from 'src/app/shared/animations/animations';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './client-category.component.html',
  styleUrls: ['./client-category.scss'],
  animations: [rowsAnimation]
})
export class ClientCategoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['sn', 'name', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  isWorking = true;

  categoryForm: FormGroup;


  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  existingCategory: any;

  constructor(
    public dialog: MatDialog,
    private sService: SettingsService,
    private fb: FormBuilder,
    private toast: ToastService,
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
    this.getCategories();
  }

  private initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      reg_no: ['', Validators.required]
    })
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  patchForm(data) {
    this.categoryForm.patchValue(
      { name: data.name })
  }

  saveChanges() {
      if(this.existingCategory?.id) {
        this.sService.updateCategory(this.categoryForm.value, this.existingCategory.id).subscribe(res => {
          this.toast.showToast(
            TOAST_STATE.success,
            res.message);
            this.getCategories();
            this.dismissMessage();
            this.categoryForm.reset();
            this.categoryForm.clearValidators();
            this.existingCategory = null;
        })
      } else {
      this.sService.addCategory(this.categoryForm.value).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
          this.getCategories();
          this.dismissMessage();
          this.categoryForm.reset();
          this.categoryForm.clearValidators();
          this.existingCategory = null;
      })
    }
  }

  reset() {
    this.categoryForm.reset();
  }

  getCategories() {
    this.sService.getCategories().subscribe(res => {
      this.dataSource.data = res;
    })
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

  openDialog(data) {
    // console.log(data, 'data..')
    // let instance: MatDialogRef<AddOrUpdateCategoryComponent, any>;
    // instance = this.dialog.open(AddOrUpdateCategoryComponent, {
    //   width:'500px',
    //   data: data ? data : {},
    //   autoFocus: false,
    // });

    // instance.afterClosed().subscribe(result => {
    //   this.getCategories();
    // });


    this.existingCategory = data;
    this.patchForm(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.categoryForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }
}
