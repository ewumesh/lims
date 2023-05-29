import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssignedSampleService } from 'src/app/services/supervisor/assigned-sample/assigned-sample.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { AssignComponent } from './component/assign.component';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './my-assigned-sample.component.html',
  styleUrls: ['./my-assigned-sample.scss'],
  animations: [collectionInOut]
})
export class MyAssignedComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;
  isLoading: boolean = true;
  userDetails: any;

  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'submissionDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  statusList: any[] = [
    { id: 1, name: 'pending' },
    { id: 2, name: 'success' },
    { id: 3, name: 'rejected' },
    { id: 4, name: 'verified' },
    { id: 5, name: 'pending' },
    { id: 6, name: 'processing' }
  ];

  constructor(
    private fb: FormBuilder,
    private service: AssignedSampleService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
    this.initFilterForm();
    this.getSampleRequests();
  }

  resetFilter() {
    this.filterForm.reset();
    this.getSampleRequests();
  }

  getSampleRequests() {
    let payload = {
      search: '',
      page: '',
      size: '',
      user: this.userDetails?.id
    }

    this.service.getAllSampleRequsets(payload).subscribe(response => {
      this.dataSource = response.results;
      this.isLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      status: '',
      from: '',
      to:''
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  assign(data) {
    let instance: MatDialogRef<AssignComponent, any>;

    instance = this.dialog.open(AssignComponent, {
      data: data ? data : null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getSampleRequests();
    })
  }

  filter() {
    this.isFilterBtnLoading = true;

    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: '',
      from: this.format(this.filterForm.value.from),
      to:this.format(this.filterForm.value.to),
      status: this.filterForm.value.status,
      user: this.userDetails?.id
    }

    this.service.getAllSampleRequsets(payload).subscribe(response => {
      this.dataSource = response.results;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }
}
