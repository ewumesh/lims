import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssignedSampleService } from 'src/app/services/supervisor/assigned-sample/assigned-sample.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { AssignComponent } from './component/assign.component';

@Component({
  templateUrl: './my-assigned-sample.component.html',
  styleUrls: ['./my-assigned-sample.scss'],
  animations: [collectionInOut]
})
export class MyAssignedComponent implements OnInit {

  filterForm: FormGroup;
  isLoading:boolean = true;
  userDetails: any;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'submissionDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  statusList: any[] = [];

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
    })
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      status:''
    })
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

  }
}
