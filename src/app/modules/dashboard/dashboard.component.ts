import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BaseChartDirective } from 'ng2-charts';
import { DashboarService } from 'src/app/services/dashboard/dashboard.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Color } from 'chartjs-plugin-datalabels/types/options';
import { Router } from '@angular/router';

import NepaliDate from 'nepali-date-converter';
import * as bikramSambat from 'bikram-sambat-js';
 
@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accountDetails: any;
  dashboardStatus: any;

  loggedUserDetails: any;

  englishDate: string = '';
  nepaliDate: string = '';

  constructor(
    private title: Title,
    private router: Router,
    private service: DashboarService
    ) {
    this.title.setTitle('Dashboard - Laboratory Information Management System');
    this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    const englishDateParts = this.englishDate.split('-');
    const year = parseInt(englishDateParts[0]);
    const month = parseInt(englishDateParts[1]);
    const day = parseInt(englishDateParts[2]);
    
    // const nepaliDateObject = bikramSambat.fromAD(year, month, day);
    // this.nepaliDate = `${nepaliDateObject.year}-${nepaliDateObject.month}-${nepaliDateObject.day}`;
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

  gotoProfile() {
    this.router.navigate(['/dashboard/my-account']);
  }

}
