import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { CommoditiesService } from 'src/app/services/commodities/commodities/commodities.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { ToastService, TOAST_STATE } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.scss']
})
export class CommoditiesComponent implements OnInit {
  displayedColumns: string[] = ['sn', 'commodity', 'price','testDuration', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  isWorking = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  constructor(
    public dialog: MatDialog,
    private sService: CommoditiesService,
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
    this.commoditiesForm = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      test_duration: [''],
      price: '',
      units: ''
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getCommodityCategories();
    this.getCommodities();
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: ''
    })
  }

  getCommodities() {
    this.isLoading = true;
    let payload = {
      search: '',
      page: '',
      size: ''
    }
    this.sService.getCommodities(payload).subscribe(res => {
      this.dataSource.data = res.results;
      this.isLoading = false;
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
      // this.isLoading = false;
    })
  }

  filter() {
    this.isLoading = true;
    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: ''
    }
    this.sService.getCommodities(payload).subscribe(res => {
      this.dataSource.data = res.results;
      this.isLoading = false;
    })
  }

  resetfilter() {
    this.filterForm.reset();
    this.getCommodities();
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
    this.commoditiesForm.patchValue(
      { name: data.name })
  }

  deleteCategory(id: number) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.sService.deleteCommodity(id).pipe(delay(400)).subscribe(_ => {
          this.getCommodities();
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
      // this.sService.updateCategory(this.commoditiesForm.value, this.existingCategory.id).subscribe(res => {
      //   this.toast.showToast(
      //     TOAST_STATE.success,
      //     res.message);
      //   this.getCategories();
      //   this.dismissMessage();
      //   this.commoditiesForm.reset();
      //   this.commoditiesForm.clearValidators();
      //   this.existingCategory = null;
      // })
    } else {
      this.sService.addCommodity(this.commoditiesForm.value).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
        this.getCommodities();
        this.dismissMessage();
        this.commoditiesForm.reset();
        this.commoditiesForm.clearValidators();
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
    this.commoditiesForm.reset();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.commoditiesForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

}
