import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DashboarService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accountDetails: any;
  dashboardStatus: any;

  loggedUserDetails: any;
  constructor(
    private title: Title,
    private service: DashboarService
    ) {
    this.title.setTitle('Dashboard - Laboratory Information Management System');
    this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
   }

  ngOnInit(): void {
    this.accountDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.getDashboardService();
  }

  getDashboardService() {
    this.service.getDashboardStatus().subscribe(res => {
      this.dashboardStatus = res;
    })
  }
}
