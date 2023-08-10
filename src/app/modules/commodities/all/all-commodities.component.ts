import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AllCommoditiesService } from 'src/app/services/commodities/all-commodities/all-commodities.service';
import { ViewmultipleDetailsDialogComponent } from './view-details/view-multiple-details';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './all-commodities.component.html',
  styleUrls: ['./all-commodities.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllCommoditiesComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['expand','sn', 'name', 'price', 'test_duration'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  expandedElement: any | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allCommodities: any = [];

  commodityCategories: any[] = [];

  filterForm: FormGroup;

  isLoading: boolean = true;

  constructor(
    private allCommoditiesService: AllCommoditiesService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getCommodityCategories();
    this.getAllCommodities();
    this.initFilterForm();
  }

  viewMoreDetails(array,type) {
    let viewList = {
      values:array,
      type:type
    }
    this.dialog.open(ViewmultipleDetailsDialogComponent, {
      data: viewList,
      minWidth:'400px'
    })
  }

  download(type) {
    let payload = {
      report_name: 'commodity-with-parameter',
      report_type: type,
      report_lang: 'en'
    }

    this.allCommoditiesService.downloadReport(payload);
  }

  getAllCommodities() {
    // this.dataSource = null
    this.isLoading = true;
    let payload = {
      search: '',
      catetegory: '',
      page: '',
      size: 100
    }
    this.allCommoditiesService.getAllCommodities(payload).subscribe(res => {
      // this.allCommodities = res;
      // this.dataSource.data = res.results;

      let allDatas = [];
      res.results.forEach((element, index) => {
        element.number = index+1;
        allDatas.push(element);
      });

      this.dataSource.data = allDatas;
      this.isLoading = false;
    })
  }

  getCommodityCategories(){
    this.allCommoditiesService.getCommodityCategoriesLimited().subscribe(res => {
      this.commodityCategories = res;
    })
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      category: ''
    })
  }

  editCommodity(data) {
    this.router.navigate(
      ['/dashboard/commodities-parameter'],
      { queryParams: {id: data.id}}
      )
  }

  filter() {
    this.isLoading = true;
    this.dataSource = null
    let payload = {
      search: this.filterForm.value.search,
      catetegory: this.filterForm.value.category,
      page: '', 
      size: 100
    }

    this.allCommoditiesService.getAllCommodities(payload).subscribe(res => {
      // this.dataSource = res.results;

      let allDatas = [];
      res.results.forEach((element, index) => {
        element.number = index+1;
        allDatas.push(element);
      });

      this.dataSource = new MatTableDataSource(allDatas);
      this.isLoading = false;
    })
  }

  reset() {
    this.filterForm.reset();
    this.getAllCommodities();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator
  }
}

