import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BaseChartDirective } from 'ng2-charts';
import { DashboarService } from 'src/app/services/dashboard/dashboard.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Color } from 'chartjs-plugin-datalabels/types/options';

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
