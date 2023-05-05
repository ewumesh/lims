import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './my-sample.component.html',
  styleUrls: ['./my-sample.component.scss'],
  animations: [collectionInOut]
})
export class MySampleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'submissionDate', 'status','action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;

  statusList: any = [];

  filterForm: FormGroup;

  constructor(
    private title: Title,
    private fb: FormBuilder
    ) {
    this.title.setTitle('My Sample - Laboratory Inventory Management System');
   }

  ngOnInit(): void {
    this.initFilterForm();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search_text: '',
      status: '',
      from: '',
      to: ''
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filterUserList() {

  }
}
