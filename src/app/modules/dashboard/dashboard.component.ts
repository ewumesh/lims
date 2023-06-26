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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [
      //  ['completed'], ['processing'], ['pending'],['recheck']
      ],
    datasets: [ {
      data: [ 50, 280, 150, 20 ]
    } ],

  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  colors = ['red', 'green', 'blue', 'yellow'];
}
