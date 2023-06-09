import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { SampleRequestsService } from 'src/app/services/sample-request/sample-request.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
// import { AssignSampleDialogComponent } from './components/payment/assign-sample-dialog.component';
// import { AssignSampleComponent } from '../sample-request-details/assign/assign-sample.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './sample-requests.component.html',
  styleUrls: ['./sample-request.scss'],
  animations: [collectionInOut]
})
export class SampleRequestsComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;
  isfilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName','commodity', 'submissionDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;
  isFilterBtnLoading: boolean = false;

  commodities: any[] = []

  download(type) {
    let payload = {
      report_name: 'user-request',
      report_type: type,
      report_lang: 'en'
    }

    this.service.downloadReport(payload);
  }

  statusList: any[] = [
    { id: 1, name: 'pending' },
    { id: 2, name: 'success' },
    { id: 3, name: 'rejected' },
    { id: 4, name: 'verified' },
    { id: 5, name: 'pending' },
    { id: 6, name: 'processing' }
  ];

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: SampleRequestsService,
    private router: Router
    ) {
    this.title.setTitle('Sample Requests - Laboratory Information Management System');
  }

  viewSampleRequests(id) {
    this.router.navigate(['/dashboard/sample-request-details', id]);
  }

  ngOnInit(): void {
    this.initFilterForm();
    this.getSampleRequests();
    this.getCommodities();
  }

  private initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      status: '',
      from: '',
      to: '',
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  getSampleRequests() {
    this.isLoading = true;
    let payload = {
      search: '',
      page: '',
      size: ''
    }

    this.service.getAllSampleRequsets(payload).subscribe(response => {
      this.dataSource.data = response.results;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
  }

  getCommodities() {
    this.service.getCommodities().subscribe(res => {
      this.commodities = res.results
    })
  }

  getCommodityName(id) {
    let c = this.commodities.find(a => a.id === id);
    return c?.name;
  }

  filterUserList() {
    this.isLoading = true;
    this.isfilterBtnLoading = true;
    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: '',
      from: this.format(this.filterForm.value.from),
      to: this.format(this.filterForm.value.to)
    }

    this.service.getAllSampleRequsets(payload).subscribe(response => {
      this.dataSource.data = response.results;
      this.isLoading = false;
      this.isfilterBtnLoading = false;
    },(error) => {
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    })
  }

  resetFilter() {
    this.filterForm.reset();
    this.getSampleRequests();
  }

  asignSampleTo(data) {
    // let instance: MatDialogRef<AssignSampleDialogComponent, any>;

    // instance = this.dialog.open(AssignSampleDialogComponent, {
    //   data: data ? data : null,
    //   width: '600px',
    //   autoFocus: false,
    // })

    // instance.afterClosed().subscribe(res => {

    // })
  }

  assign(data) {
    // let instance: MatDialogRef<AssignSampleComponent, any>;

    // instance = this.dialog.open(AssignSampleComponent, {
    //   data: data ? data : null,
    //   width: '600px',
    //   autoFocus: false,
    // })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
  }
}
