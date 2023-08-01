import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminLabReportService } from 'src/app/services/lab-report/admin-lab-report.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './lab-report.component.html',
  styleUrls: ['./lab-report.scss'],
  animations: [collectionInOut]
})
export class LabReportComponent implements OnInit {
  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;

  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'assignedDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loggedUserDetails:any;

  statusList: any[] = [];

  clients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AdminLabReportService,
    private router: Router
    ) {
      this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
      // console.log(this.loggedUserDetails, 'POOPO')
      // if(this.loggedUserDetails.role === 4) {
      //   this.displayedColumns = ['sn', 'sampleId', 'sampleName', 'commodity', 'assignedDate', 'action'];
      // } else {
        this.displayedColumns = ['sn', 'sampleId', 'sampleName','client', 'commodity', 'assignedDate', 'status', 'action'];
      // }


      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      this.getStatusList();
    }

    getClients() {
      this.service.getClientCategories().subscribe(res => {
        this.clients = res.results;
      })
    }

    getClientName(id) {
      return this.clients.find(a =>a.id ===id)?.name;
    }

    getStatusList() {
      this.service.getStatusList().subscribe(res => {
        this.statusList = res;
      })
    }

  ngOnInit(): void {
    this.initFilterForm();
    this.getSamples();
    this.getClients();
  }

  getSamples() {
    this.isLoading = true;
    let payload = {
      search: '',
      page: '',
      size: '',
      from: '',
      to: '',
      status: '',
      client_category:''
    }
    this.service.getSampleReportDetails(payload).subscribe(response => {
      this.dataSource.data = response;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
   }

  initFilterForm() {
    this.filterForm =  this.fb.group({
      search: '',
      from: '',
      to: '',
      status: '',
      client_category:''
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  reset() {
    this.filterForm.reset();
    this.getSamples();
  }

  viewAssignedSampleDetails(id) {
    this.router.navigate(['/dashboard/report', id]);
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  filter() {
    this.isLoading = true;
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
      search: this.filterForm.value.search,
      page: '',
      size: '',
      from: from,
      to: to,
      status: this.filterForm.value.status,
      client_category:this.filterForm.value.client_category
    }
    this.service.getSampleReportDetails(payload).subscribe(response => {
      this.dataSource.data = response;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
  }
}
