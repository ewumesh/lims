import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TestRequestService } from 'src/app/services/analyst/test-request/test-request.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './test-request.component.html',
  styleUrls: ['./test-request.scss'],
  animations: [collectionInOut]
})
export class TestRequestComponent implements OnInit {

  filterForm: FormGroup;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'submissionDate', 'requestedDate', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;

  userDetails: any;
  commodities:any[] =[];

  constructor(
    private fb: FormBuilder,
    private service: TestRequestService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.getTestRequsest();
    this.initFilterForm();
    this.getCommodities();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: ''
    })
  }

  getTestRequsest() {
    let payload = {
      page: '',
      size: '',
      search: '',
      user: this.userDetails?.id
    }
    this.service.getTestRequests(payload).subscribe(res => {
      this.dataSource = res.results;
      this.isLoading= false;
    })
  }

  getCommodities() {
    let payload = {
      page: '',
      size: '',
      search: ''
    }
    this.service.getAllCommodities(payload).subscribe(res => {
      this.commodities = res.results;
    })
  }

  getCommodityName(id) {
    let commodity = this.commodities.find(x => x.id === id);
    if(commodity) {
      return commodity.name;
    }
  }

  viewRequestDetails(row) {
    this.router.navigate(['/dashboard/test-request-details', row.id]);
  }

  filter() {
    let payload = {
      page: '',
      size: '',
      search: this.filterForm.value.search,
      user: this.userDetails?.email
    }
    this.service.getTestRequests(payload).subscribe(res => {
      this.dataSource = res.results;
      this.isLoading= false;
    })
  }

  reset() {
    this.filterForm.reset();
  }
}
