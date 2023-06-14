import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TrackSampleService } from 'src/app/services/track-sample/track-sample.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './track-sample.component.html',
  styleUrls: ['./track-sample.scss'],
  animations: [collectionInOut]
})
export class TrackSampleComponent implements OnInit, AfterViewInit {
  filterForm: FormGroup;

  isLoading = false;
  isFilterBtnLoading = false;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'assignedDate', 'assigned', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TrackSampleService
  ) { }

  statusList: any[] = []

  ngOnInit(): void {
    this.initFilterForm();
    this.getSamples();
    this.getStatus();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      from: '',
      to: '',
      status: ''
    })
  }

  getStatus() {
    this.service.getStatus().subscribe(res => {
      this.statusList = res;
    })
  }

  getSamples() {
    let paylaod = {
      search: '',
      from: '',
      to: ''
    }

    this.service.getSampleDetails(paylaod).subscribe(res => {
      this.dataSource.data = res;
    })
  }

  filter() {
    this.isFilterBtnLoading = true;

    let from;
    let to;

    if(this.filterForm.value.from){
      from = this.format(this.filterForm.value.from);
    } else {
      from = '';
    }

    if(this.filterForm.value.to){
      to = this.format(this.filterForm.value.to);
    } else {
      to = '';
    }

    let payload = {
      search: this.filterForm.value.search,
      from: from,
      to: to,
      page: '',
      size: ''
    }

    this.service.getSampleDetails(payload).subscribe(res => {
      this.dataSource.data = res
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  reset() {
    this.isFilterBtnLoading = false;
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  viewSample(id) {
     this.router.navigate(['/dashboard/track-sample-details', id])
  }
}
