import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ComoditiesService } from 'src/app/services/commodity/comodities.service';

@Component({
  templateUrl: './comodities.component.html',
  styleUrls: ['./comodities.component.scss']
})
export class ComoditiesComponent implements OnInit {
  displayedColumns: string[] = ['foodProduct', 'rate', 'testDuration', 'category'];
  dataSource = new MatTableDataSource<any>(comodities);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private title: Title,
    private commodityService: ComoditiesService
  ) {
    this.title.setTitle('Comodities - Laboratory Information Management System');
  }

  ngOnInit(): void {
    this.commodityService.getComodities().subscribe(res => console.log(res, 'RES..'))
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // For Custom table
  ordersTableColumns = [
    {
      name: 'S.N',
      dataKey: 'sn',
      position: 'right',
      isSortable: false
    },
    {
      name: 'Food Product(खाद्य वस्तु)', // column name
      dataKey: 'foodProduct', // name of key of the actual data in this column
      position: 'right', // should it be right-aligned or left-aligned?
      isSortable: false // can a column be sorted?
    },
    {
      name: 'Rate(दस्तुर)',
      dataKey: 'rate',
      position: 'right',
      isSortable: false
    },
    {
      name: 'Test Duration(परिक्षण समायावधि)',
      dataKey: 'testDuration',
      position: 'right',
      isSortable: false
    },
    {
      name: 'Category',
      dataKey: 'category',
      position: 'right',
      isSortable: false
    }
  ];
  orders = comodities;
  removeOrder(e) {

  }

  sortData(e) { }
}

const comodities: any[] = [
  {sn: 1, foodProduct: 'Test', rate: 'Rs. 45000', testDuration: '10 days', category: 'Test category' },
  {sn: 2, foodProduct: 'Test', rate: 'Rs. 45000', testDuration: '10 days', category: 'Test category' },
  {sn: 3, foodProduct: 'Test', rate: 'Rs. 45000', testDuration: '10 days', category: 'Test category' },
  {sn: 4, foodProduct: 'Test', rate: 'Rs. 45000', testDuration: '10 days', category: 'Test category' },
  {sn: 5, foodProduct: 'Test', rate: 'Rs. 45000', testDuration: '10 days', category: 'Test category' },
  {sn: 6, foodProduct: 'Test', rate: 'Rs. 45000', testDuration: '10 days', category: 'Test category' },
  {sn: 7, foodProduct: 'Test', rate: 'Rs. 45000', testDuration: '10 days', category: 'Test category' },
  {sn: 8, foodProduct: 'Test', rate: 'Rs. 45000', testDuration: '10 days', category: 'Test category' }
];
