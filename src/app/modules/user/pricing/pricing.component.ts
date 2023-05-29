import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { PricingService } from 'src/app/services/pricing/pricing.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['./pricing.component.scss'],
  templateUrl: './pricing.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    collectionInOut
  ],
})
export class PricingComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['expand','sn', 'name', 'price', 'test_duration'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  expandedElement: any | null;

  filterForm: FormGroup;

  categories: any[] = [];

  isLoading: boolean = true;


  constructor(
    private title: Title,
    private pricingService: PricingService,
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
    let payload = {
      page: '',
      size: '',
      search: this.filterForm.value.search_text,
      category: this.filterForm.value.category
    }
    this.pricingService.getAllCommodities(payload).subscribe(res=> {
      this.dataSource = res.results;
      this.isLoading = false;
    })
  }

  getAllCommodities() {
    let payload = {
      page: '',
      size: '',
      search: ''
    }
    this.pricingService.getAllCommodities(payload).subscribe(res=> {
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

