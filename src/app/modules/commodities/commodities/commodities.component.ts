import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { CommoditiesService } from 'src/app/services/commodities/commodities/commodities.service';
import { CommodityCategoryService } from 'src/app/services/settings/commodity-category/commodity-category.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { ToastService, TOAST_STATE } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { AddCommodityComponent } from './add-commodities/add-commodity.component';

@Component({
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.scss']
})
export class CommoditiesComponent implements OnInit {
  displayedColumns: string[] = ['sn', 'commodity', 'price', 'testDuration', 'category', 'action'];
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

  message: any = {};
  responseError = null;
  submitBtn = false;

  loggedUserDetails:any;

  constructor(
    public dialog: MatDialog,
    private sService: CommoditiesService,
    private cService: CommodityCategoryService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.genericValidator = new GenericValidator({
      'name': {
        'required': 'Category Name is required.'
      }
    })
  }

  addParameter() {
    let instance: MatDialogRef<AddCommodityComponent, any>
    instance = this.dialog.open(AddCommodityComponent, {
      width: '800px',
      data: ''
    })

    instance.afterClosed().subscribe(res => {
      this.getCommodities();
    })
  }

  editCommodity(data) {
    let instance: MatDialogRef<AddCommodityComponent, any>
    instance = this.dialog.open(AddCommodityComponent, {
      width: '800px',
      data: data
    })

    instance.afterClosed().subscribe(res => {
      this.getCommodities();
    })
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
      size: 200
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

  download(type) {
    let payload = {
      report_name: 'commodity',
      report_type: type,
      report_lang: 'en'
    }

    this.cService.downloadReport(payload);
  }

  getCommodityCategoryName(id) {
    let category = this.commodityCategories?.find(a => a.id === id);
    return category?.name
  }

  getCommodityCategoryNameNepali(id) {
    let category = this.commodityCategories?.find(a => a.id === id);
    return category?.name_nepali
  }

  filter() {
    this.isLoading = true;
    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: 200
    }
    this.sService.getCommodities(payload).subscribe(res => {
      this.dataSource.data = res.results;
      this.isLoading = false;
    })
  }

  resetfilter() {
    this.filterForm.reset();
    this.getCommodities();
    this.message = {};
    this.responseError = null;
    this.existingCategory = null;
  }

  openDialog(data) {
    this.existingCategory = data;
    this.patchForm(data);
    window.scroll(0,0);
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
      {
        id: this.existingCategory?.id,
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

  deleteCategory(id: number) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.sService.deleteCommodity(id).pipe(delay(400)).subscribe(_ => {
          this.getCommodities();
          this.toast.showToast(TOAST_STATE.success, 'Commodity Deleted Successfully!')
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    if (this.existingCategory?.id) {
      this.sService.updateCommodity(this.commoditiesForm.value, this.existingCategory.id).subscribe(res => {
        this.toast.showToast(
          TOAST_STATE.success,
          res.message);
          this.getCommodities();
          this.dismissMessage();
          this.commoditiesForm.reset();
          this.commoditiesForm.clearValidators();
          this.existingCategory = null;
          this.submitBtn = false;
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
        this.getCommodities();
        this.dismissMessage();
        this.commoditiesForm.reset();
        this.commoditiesForm.clearValidators();
        this.existingCategory = null;


        this.message = {};
        this.responseError = null;
        this.submitBtn = false;
      }, (error) => {
        window.scroll(0, 0);
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
