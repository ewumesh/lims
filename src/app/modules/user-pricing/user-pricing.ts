import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounce, debounceTime } from 'rxjs';
import { UserPricingService } from 'src/app/services/user-pricing/user-pricing.service';

/**
 * @title Table with expandable rows
 */
@Component({
  styleUrls: ['./user-pricing.scss'],
  templateUrl: './user-pricing.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    collectionInOut
  ],
})
export class UserPricingComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['expand','sn', 'name', 'price', 'test_duration'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  expandedElement: any | null;

  filterForm: FormGroup;

  categories: any[] = [];

  isLoading: boolean = true;

  filterBtnLoading: boolean = false;


  constructor(
    private title: Title,
    private pricingService: UserPricingService,
    private fb: FormBuilder
    ) {
    this.title.setTitle('Pricing - Laboratory Information Management System');
  }

  ngOnInit(): void {
    this.getAllCommodities();
    this.initFilterForm();
    this.getCommoditiesCategories();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search_text: '',
      category: ''
    })
  }

  filterUserList() {
    this.filterBtnLoading = true;
    this.isLoading = true;
    let c
    if(this.filterForm.value.category) {
      c = this.filterForm.value.category;
    } else  {
      c= '';
    }
    let payload = {
      page: '',
      size: 100,
      search: this.filterForm.value.search_text,
      category: c
    }
    this.pricingService.getAllCommodities(payload).subscribe(res=> {
      this.dataSource.data = res.results;
      this.isLoading = false;
      this.filterBtnLoading = false;
    })
  }

  getAllCommodities() {
    this.isLoading = true;
    let payload = {
      page: '',
      size: 100,
      search: '',
      category: ''
    }
    this.pricingService.getAllCommodities(payload).pipe(debounceTime(500)).subscribe(res=> {
      this.dataSource.data = res.results;
      this.isLoading = false;
    })
  }

  resetFilter() {
    this.filterForm.reset();
    this.getAllCommodities();
  }

  getCommoditiesCategories() {
    this.pricingService.getCategories().subscribe(res => {
      this.categories = res.results;
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator
  }

}

