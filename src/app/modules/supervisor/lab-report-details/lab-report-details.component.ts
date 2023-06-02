import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './lab-report-details.component.html',
  styleUrls: ['./lab-report.scss']
})
export class LabReportDetailsComponent implements OnInit {
  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;

  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'parameter', 'assignedDate', 'assignTo', 'status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sampleDetails: any;

  constructor(private fb: FormBuilder) { }

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

  filter() {

  }

  reset() {

  }

  generateReport() {

  }
}
