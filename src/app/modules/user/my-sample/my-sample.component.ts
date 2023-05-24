import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MySampleService } from 'src/app/services/my-sample/my-sample.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './my-sample.component.html',
  styleUrls: ['./my-sample.component.scss'],
  animations: [collectionInOut]
})
export class MySampleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'submissionDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;

  statusList: any = [];

  filterForm: FormGroup;

userDetails: any;
  constructor(
    private title: Title,
    private fb: FormBuilder,
    private service: MySampleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title.setTitle('My Sample - Laboratory Information Management System');
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  ngOnInit(): void {
    this.initFilterForm();
    this.getSamples();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    // this.service.deleteSample(1).subscribe(res => {
    //   console.log(res)
    // })
  }

  viewSampleDetails(id) {
    this.router.navigate(['/dashboard/sample-details', id]);
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search_text: '',
      status: '',
      from: '',
      to: ''
    })
  }

  getSamples() {
    let payload = {
      search:'',
      to: '',
      from: '',
      page: '',
      size: '',
      user: this.userDetails.email
    }
    this.service.getMySamples(payload).subscribe(response => {
      console.log(response, "SAMPLES...")

      this.dataSource = response.results;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filterUserList() {
    let payload = {
      search:this.filterForm.value.search_text,
      to: '',
      from: '',
      page: '',
      size: ''
    }
    this.service.getMySamples(payload).subscribe(response => {
      console.log(response, "SAMPLES...")

      this.dataSource = response.results;
    })
  }
}
