import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/category/settings.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './commodity-category.component.html',
  styleUrls: ['./commodity-category.scss']
})
export class CommodityCategoriesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['sn', 'name', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  isWorking = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  categoryForm: FormGroup;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];
  existingCategory: any;

  constructor(
    public dialog: MatDialog,
    private sService: CommodityCategoryService,
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
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      reg_no: ['']
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  getCategories() {
    this.sService.getAllCommodityCategories().subscribe(res => {
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
    this.categoryForm.patchValue(
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
    if (this.existingCategory?.id) {
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

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  reset() {
    this.categoryForm.reset();
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
