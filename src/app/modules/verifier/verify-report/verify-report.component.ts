import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './verify-report.component.html',
  styleUrls: ['./verify-report.scss']
})
export class VerifyReportComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'submissionDate', 'requestedDate', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  filter() {

  }

  reset() {

  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }
}
