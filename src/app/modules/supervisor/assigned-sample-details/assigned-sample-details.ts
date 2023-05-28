import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './assigned-sample-details.html',
  styleUrls: ['./assigned-sample.scss'],
  animations: [collectionInOut]
})
export class AssignedSampleDetailsComponent implements OnInit {

  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;
  tStatus = 'pending'

  displayedColumns: string[] = ['sn', 'parameter', 'assignedDate', 'assignTo', 'status', 'action'];
  dataSource = new MatTableDataSource<any>([{id: 12, name: 'Test Sample', commodity: 'No Commodity', assignedDate: '2001-02-22', assigned: [{id: 1, name: 'Umesh Thapa'}, {id: 2, name: 'Manish Basnet'}], status: 'processing'}]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  statusList: any[]  = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      status:'',
      from: '',
      to: ''
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  filter() {

  }

}
