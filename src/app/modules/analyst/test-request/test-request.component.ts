import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class TestRequestComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'requestedDate','status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;

  userDetails: any;
  commodities:any[] =[];

  constructor(
    private fb: FormBuilder,
    private service: TestRequestService,
    private router: Router
    ) {
      this.initFilterForm();
    }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.getTestRequsest();
    this.getCommodities();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      from: '',
      to: ''
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  getTestRequsest() {
    this.isLoading = true;
    let payload = {
      page: '',
      size: '',
      search: '',
      user: this.userDetails?.id,
      from: '',
      to: ''
    }
    this.service.getTestRequests(payload).subscribe(res => {
      this.dataSource.data = res.results;
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
    let from;
    let to;

    if(this.filterForm.value.from){
      from = this.format(this.filterForm.value.from);
    } else {
      from = '';
    }

    if(this.filterForm.value.to){
      to = this.format(this.filterForm.value.to);
    } else {
      to = '';
    }

    let payload = {
      page: '',
      size: '',
      search: this.filterForm.value.search,
      from: from,
      to: to,
      user: this.userDetails?.id
    }
    this.service.getTestRequests(payload).subscribe(res => {
      this.dataSource = res.results;
      this.isLoading= false;
    })
  }

  reset() {
    this.filterForm.reset();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
