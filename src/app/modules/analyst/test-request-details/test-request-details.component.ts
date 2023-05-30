import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TestRequestDetailsService } from 'src/app/services/analyst/test-request-details/test-request-details.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { CalculateComponent } from './calculate/calculate.component';

@Component({
  templateUrl: './test-request-details.component.html',
  styleUrls: ['./test-request-details.component.scss'],
  animations: [collectionInOut]
})
export class TestRequestDetailsComponent implements OnInit {

  displayedColumns: string[] = ['sn', 'parameter', 'methods','formula','mandatory_standard', 'units', 'result', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean = true;
  userDetails:any;

  testRequestDetails:any;

  constructor(
    private service: TestRequestDetailsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  getTestResultDetails() {
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      id: id,
      user: this.userDetails.id
    }
    this.isLoading = true;
    this.service.getTestRequestDetails(payload).subscribe(response => {
      this.testRequestDetails = response;
      this.dataSource = response?.parameter;
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

    this.getTestResultDetails();
   }

   calculate(data) {

    let allValue = {
      parameters: data,
      details: this.testRequestDetails
    }
    let instance: MatDialogRef<CalculateComponent, any>;

    instance = this.dialog.open(CalculateComponent, {
      data: allValue ? allValue : null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getTestResultDetails();
    })
   }
}
