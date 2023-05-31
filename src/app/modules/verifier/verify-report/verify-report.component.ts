import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './verify-report.component.html',
  styleUrls: ['./verify-report.scss'],
  animations: [collectionInOut]
})
export class VerifyReportComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'submissionDate', 'requestedDate', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initform();
  }

  initform() {
    this.filterForm = this.fb.group({
      search: ''
    })
  }

  filter() {

  }

  reset() {

  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }
}
