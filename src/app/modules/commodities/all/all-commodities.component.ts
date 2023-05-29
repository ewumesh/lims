import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AllCommoditiesService } from 'src/app/services/commodities/all-commodities/all-commodities.service';

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

  columnsToDisplay = ['expand','sn', 'name', 'price', 'test_duration', 'download'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  expandedElement: any | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allCommodities: any = [];

  commodityCategories: any[] = [];

  filterForm: FormGroup;

  isLoading: boolean = true;

  constructor(
    private allCommoditiesService: AllCommoditiesService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getAllCommodities();
    this.getCommodityCategories();

    this.initFilterForm();
  }

  getAllCommodities() {
    // this.dataSource = null
    this.isLoading = true;
    let payload = {
      search: '',
      catetegory: '',
      page: '',
      size: ''
    }
    this.allCommoditiesService.getAllCommodities(payload).subscribe(res => {
      // this.allCommodities = res;
      this.dataSource.data = res.results;
      this.isLoading = false;
    })
  }

  getCommodityCategories(){
    this.allCommoditiesService.getCommodityCategories().subscribe(res => {
      this.commodityCategories = res?.results;
    })
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      category: ''
    })
  }

  filter() {
    this.isLoading = true;
    this.dataSource = null
    let payload = {
      search: this.filterForm.value.search,
      catetegory: '',
      page: '',
      size: ''
    }

    this.allCommoditiesService.getAllCommodities(payload).subscribe(res => {
      this.dataSource = res.results;
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

