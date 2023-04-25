import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './my-sample.component.html',
  styleUrls: ['./my-sample.component.scss']
})
export class MySampleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'submissionDate', 'status','action'];
  dataSource = new MatTableDataSource<any>(mySamples);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private title: Title) {
    this.title.setTitle('My Sample - Laboratory Inventory Management System');
   }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

const mySamples: any[] = [
  {sn: 1, sampleId: 'SAID001', sampleName: 'Test Sample', submissionDate: '2023-03-24', status: 'pending'},
  {sn: 2, sampleId: 'SAID032', sampleName: 'Test Sample 121', submissionDate: '2023-03-14', status: 'success'},
  {sn: 2, sampleId: 'SAID198', sampleName: 'Normal Test ', submissionDate: '2023-04-01', status: 'rejected'},
];
