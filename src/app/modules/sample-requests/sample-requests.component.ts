import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  templateUrl: './sample-requests.component.html',
  styleUrls: ['./sample-request.scss'],
  animations: [collectionInOut]
})
export class SampleRequestsComponent implements OnInit {

  filterForm: FormGroup;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'submissionDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;

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
  }

  private initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      status: ''
    })
  }

  getSampleRequests() {
    let payload = {
      search: '',
      page: '',
      size: ''
    }

    this.service.getAllSampleRequsets(payload).subscribe(response => {
      this.dataSource = response.results;
      this.isLoading = false;
    })
  }

  filterUserList() {

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
}
