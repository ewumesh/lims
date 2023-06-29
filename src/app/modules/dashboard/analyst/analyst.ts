import { Component, OnInit, ViewChild } from "@angular/core";

import { ChartComponent } from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart
} from "ng-apexcharts";
import { DashboarService } from "src/app/services/dashboard/dashboard.service";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};

@Component({
    selector: 'analyst-dashboard',
    templateUrl: './analyst.html',
    styleUrls: ['./analyst.scss']
})

export class AnalystDashboard implements OnInit {
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    isDashboardStatus = false;
    dashboardStatus:any;
    pieSeries:any[] =[];

    loadingCompletedSample = false;
    completedSamples:any[] = [];
    isLoadingDownloadBtn = false;
    loadingLatestSample = false;
    latestSamples:any[] = [];
    userDetails:any;
    constructor(private service: DashboarService) {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }

    getDashboardStatus() {
        this.isDashboardStatus = true;
        this.service.getDashboardStatus().subscribe(a => {
            // a.rejected = 0;
            this.dashboardStatus = a;

            let chaartSeries = [this.calculatePercentage(a.completed, a.total_request), this.calculatePercentage(a.pending, a.total_request), this.calculatePercentage(a.not_verified, a.total_request), this.calculatePercentage(a.recheck, a.total_request)];
            this.pieSeries = chaartSeries;
            this.initializeGraph();
            this.isDashboardStatus = false;
        },(error)=> {
            this.isDashboardStatus = false;
        })
    }

    getTestRequsest() {
        // this.la = true;
        let payload = {
          page: '',
          size: '',
          search: '',
          user: this.userDetails?.id,
          from: '',
          to: '',
          status: ''
        }
        this.service.getTestRequests(payload).subscribe(res => {
          this.latestSamples = res.results;
        })
      }

    calculatePercentage(value, total) {
        let percentage =( value/total)*100;
        return percentage;
    }

    ngOnInit() {
        this.getDashboardStatus();
        this.getTestRequsest();
    }

    initializeGraph() {
        this.chartOptions = {
            series: this.pieSeries,
            chart: {
                width: 350,
                type: "pie"
            },
            labels: ["Completed", "Pending", "Not Verified", "Recheck"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "top"
                        }
                    }
                }
            ]
        };
    }
}