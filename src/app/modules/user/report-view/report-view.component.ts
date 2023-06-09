import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportViewService } from 'src/app/services/report-view/report-view.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
  animations: [collectionInOut]
})
export class ReportViewComponent implements OnInit,AfterViewInit {

  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;

  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'assignedDate','completedDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private service: ReportViewService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.getSamples();
  }

  getSamples() {
    this.isLoading = true;
    let payload = {
      search: '',
      page: '',
      size: '',
      from: '',
      to: ''
    }
    this.service.getSampleReportDetails(payload).subscribe(response => {
      this.dataSource.data = response;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
   }

   format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  initFilterForm() {
    this.filterForm =  this.fb.group({
      search: '',
      from: '',
      to: ''
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  reset() {
    this.filterForm.reset();
    this.getSamples();
  }

  viewAssignedSampleDetails(id) {
    this.router.navigate(['/dashboard/sample-test-report', id]);
  }

  filter() {
    this.isLoading = true;
    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: '',
      from: this.format(this.filterForm.value.from),
      to: this.format(this.filterForm.value.to)
    }
    this.service.getSampleReportDetails(payload).subscribe(response => {
      this.dataSource.data = response;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
  }
}
