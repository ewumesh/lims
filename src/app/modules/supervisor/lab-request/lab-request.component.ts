import { Component, OnInit, ViewChild } from '@angular/core';
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
export class LabRequestComponent implements OnInit {

  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;

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
    this.service.getAllAssignedSamples().subscribe(response => {
      console.log(response);
      this.samples = response.results;
      this.dataSource = response.results;
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

  filter() {

  }

  reset() {
    this.filterForm.reset();
  }
}
