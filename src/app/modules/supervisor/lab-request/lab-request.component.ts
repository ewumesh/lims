import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LabRequestService } from 'src/app/services/supervisor/lab-request/lab-request.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './lab-request.component.html',
  styleUrls: ['./lab-request.scss'],
  animations: [collectionInOut]
})
export class LabRequestComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;
  isLoading:boolean = true;
  userDetails: any;

  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'assignedDate', 'assigned', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  statusList: any[] = [
    {id: 1, name: 'pending'},
    {id: 2, name: 'success'},
    {id: 3, name: 'rejected'},
    {id: 4, name: 'verified'},
    {id: 5, name: 'pending'},
    {id: 6, name: 'processing'}
  ];

  samples: any[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LabRequestService
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
    this.service.getAllAssignedSamples(payload).subscribe(response => {
      console.log(response);
      this.samples = response.results;
      this.dataSource = response.results;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
   }

   viewAssignedSampleDetails() {
    this.router.navigate(['/dashboard/assigned-sample-details',1])
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
      search: this.filterForm.value.search,
      page: '',
      size: '',
      from: this.format(this.filterForm.value.from),
      to: this.format(this.filterForm.value.to)
    }
    this.service.getAllAssignedSamples(payload).subscribe(response => {
      console.log(response);
      this.samples = response.results;
      this.dataSource = response.results;
      this.isLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
  }

  reset() {
    this.filterForm.reset();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }
}
