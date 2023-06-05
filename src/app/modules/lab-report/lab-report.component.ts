import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminLabReportService } from 'src/app/services/lab-report/admin-lab-report.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './lab-report.component.html',
  styleUrls: ['./lab-report.scss'],
  animations: [collectionInOut]
})
export class LabReportComponent implements OnInit {
  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;

  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'assignedDate', 'assigned', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private service: AdminLabReportService,
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
    this.service.getSampleReportDetails().subscribe(response => {
      this.dataSource.data = response;
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.isFilterBtnLoading = false;
    })
   }

  initFilterForm() {
    this.filterForm =  this.fb.group({
      search: ''
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
    this.router.navigate(['/dashboard/final-report', id]);
  }

  filter() {

  }
}
