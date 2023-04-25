import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-name',
  templateUrl: './user-request.component.html'
})
export class UserRequestsComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('User Requests - Laboratory Inventory Management System');
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
      name: 'Username', // column name
      dataKey: 'userName', // name of key of the actual data in this column
      position: 'right', // should it be right-aligned or left-aligned?
      isSortable: false // can a column be sorted?
    },
    {
      name: 'Client type',
      dataKey: 'clientType',
      position: 'right',
      isSortable: false
    },
    {
      name: 'Register Date',
      dataKey: 'registerDate',
      position: 'right',
      isSortable: false
    },
    {
      name: 'Email',
      dataKey: 'email',
      position: 'right',
      isSortable: false
    },

    {
      name: 'Phone',
      dataKey: 'phone',
      position: 'right',
      isSortable: false
    }
  ];
  orders = comodities;

  ngOnInit(): void { }

  sortData( e) {

  }

  removeOrder(e) {}
}

const comodities: any[] = [
  {sn: 1, userName: 'ewumesh', clientType: 'Internal', registerDate: '10-11-2022', email: 'ewumesh@gmail.com', phone: '+977-9818780677' }
];

