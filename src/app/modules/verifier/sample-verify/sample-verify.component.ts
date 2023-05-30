import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SampleVerifyService } from 'src/app/services/verifier/sample-verify/sample-verify.service';

@Component({
  templateUrl: './sample-verify.component.html',
  styleUrls: ['./sample-verify.scss']
})
export class SampleVerifyComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'submissionDate', 'requestedDate', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: SampleVerifyService
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
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
