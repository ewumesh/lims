import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignedSampleDetailsService } from 'src/app/services/supervisor/assigned-sample-details/assign-sample-details.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { ViewReportComponent } from './view-report/view-report';

@Component({
  templateUrl: './assigned-sample-details.html',
  styleUrls: ['./assigned-sample.scss'],
  animations: [collectionInOut]
})
export class AssignedSampleDetailsComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;
  tStatus = 'pending'

  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'parameter', 'assignedDate', 'assignTo', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  statusList: any[] = [
    { id: 1, name: 'pending' },
    { id: 2, name: 'success' },
    { id: 3, name: 'rejected' },
    { id: 4, name: 'verified' },
    { id: 5, name: 'pending' },
    { id: 6, name: 'processing' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AssignedSampleDetailsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.getAssignedSamples()
  }

  viewReport(data) {
    let instance: MatDialogRef<ViewReportComponent, any>;

    instance = this.dialog.open(ViewReportComponent, {
      data: data ? data : null,
      // width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      // this.getSampleRequests();
    })
  }

  assign() {
    let sampleId =this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/dashboard/lab-sample-details',sampleId])
  }

  getAssignedSamples() {
    this.isLoading = true;
    let sampleId =this.route.snapshot.paramMap.get('id');
    let payload = {
      sampleId: sampleId
    }
    this.service.getAssignedSamples(payload).subscribe(res => {
      console.log(res, 'RES')
      this.dataSource.data = res.parameters;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    })
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
    this.isFilterBtnLoading = true;

    let payload = {
      page: '',
      size: '',
      search: this.filterForm.value.search,
      from : this.format(this.filterForm.value.from),
      to: this.format(this.filterForm.value.to),
      status: this.filterForm.value.status
    }
  }

  resetFilter() {
    this.filterForm.reset();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

}
