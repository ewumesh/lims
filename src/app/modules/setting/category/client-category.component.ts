import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SettingsService } from 'src/app/services/settings/category/settings.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { delay } from 'rxjs';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { collectionInOut, rowsAnimation } from 'src/app/shared/animations/animations';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './client-category.component.html',
  styleUrls: ['./client-category.scss'],
  animations: [rowsAnimation, collectionInOut]
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
  message:any = {};
  responseError = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  existingCategory: any;

  isLoading: boolean = true;

  loadingFormBtn: boolean = false;

  constructor(
    public dialog: MatDialog,
    private sService: SettingsService,
    private fb: FormBuilder,
    private toast: ToastService,
  ) {
    this.genericValidator = new GenericValidator({
      'name': {
        'required': 'Category Name is required.'
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  private initForm() {
    this.categoryForm = this.fb.group({
      name: [''],
      address: [''],
      reg_no: ['']
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
    this.loadingFormBtn = true;

    if (this.categoryForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      window.scroll(0,0);
      this.loadingFormBtn = false;
      return;
    }
      if(this.existingCategory?.id) {
        this.sService.updateCategory(this.categoryForm.value, this.existingCategory.id).subscribe(res => {
          this.loadingFormBtn = false;
          this.toast.showToast(
            TOAST_STATE.success,
            res.message);
            this.getCategories();
            this.dismissMessage();
            this.categoryForm.reset();
            this.categoryForm.value.name = '  ';
            this.message = {};
            this.responseError = {};
            // this.categoryForm.clearValidators();
            this.existingCategory = null;
        },(error) => {
          this.loadingFormBtn = false;
          this.message =  {};
          this.responseError = error.error;
        })
      } else {
      this.sService.addCategory(this.categoryForm.value).subscribe(res => {
        this.loadingFormBtn = false;
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
          this.getCategories();
          this.dismissMessage();
          this.categoryForm.reset();
          this.categoryForm.clearValidators();
          this.existingCategory = null;
          this.responseError = {};
      },(error) => {
        this.responseError = error.error;
        this.loadingFormBtn = false;
        this.message =  {};
      })
    }
  }

  reset() {
    this.categoryForm.reset();
    this.message = {};
    this.responseError = {};
  }

  getCategories() {
    this.isLoading = true;
    this.sService.getCategories().subscribe(res => {
      this.dataSource.data = res.results;
      this.isLoading = false;
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
