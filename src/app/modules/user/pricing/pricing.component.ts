import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { PricingService } from 'src/app/services/pricing/pricing.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { collectionInOut } from 'src/app/shared/animations/animations';

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
export class PricingComponent implements OnInit {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['expand','sn', 'name', 'price','units', 'test_duration'];
  expandedElement: any | null;

  filterForm: FormGroup;

  categories: any[] = [];

  isLoading: boolean = true;


  constructor(
    private title: Title,
    private pricingService: PricingService,
    private fb: FormBuilder
    ) {
    this.title.setTitle('Pricing - Laboratory Inventory Management System');
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

  }

  getAllCommodities() {
    this.pricingService.getAllCommodities().subscribe(res=> {
      this.dataSource = res.results;
      this.isLoading = false;
    })
  }

  getCommoditiesCategories() {
    this.pricingService.getCategories().subscribe(res => {
      this.categories = res.results;
    })
  }

}

