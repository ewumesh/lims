import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

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
  ApexPlotOptions:any;
  labels: any;
  legend:any;
  plotOptions: any;
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
    constructor(
        private service: DashboarService,
        private router: Router
        ) {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }

    gotoReport() {
        this.router.navigate(['/dashboard/lab-report']);
    }

    gotoRequest() {
        this.router.navigate(['/dashboard/test-request']);
    }

    getDashboardStatus() {
        this.isDashboardStatus = true;
        this.service.getDashboardStatus().subscribe(a => {
            // a.rejected = 0;
            this.dashboardStatus = a;

            let chaartSeries = [this.calculatePercentage(a.completed, a.total_request), this.calculatePercentage(a.pending, a.total_request), this.calculatePercentage(a.processing, a.total_request), this.calculatePercentage(a.not_verified, a.total_request), this.calculatePercentage(a.recheck, a.total_request)];
            this.pieSeries = chaartSeries;
            this.initializeGraph();
            this.isDashboardStatus = false;
        },(error)=> {
            this.isDashboardStatus = false;
        })
    }

    getTestRequsest() {
        // this.la = true;
        this.loadingLatestSample = true;
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
          this.loadingLatestSample = false;
        },(error) => {
            this.loadingLatestSample = false;
        })
      }

      getSampleReport() {
        this.loadingCompletedSample = true;
        let payload = {
            search:'',
            from:' ',
            to:'',
            status: '',
            page: '',
            size:''
        }
        this.service.getSampleReportDetails(payload).subscribe(res => {
            this.completedSamples = res;
            this.loadingCompletedSample = false;
            
        },(error)=>{
            this.loadingCompletedSample = false;
        })
      }

    calculatePercentage(value, total) {
        let percentage =( value/total)*100;
        return percentage;
    }

    ngOnInit() {
        this.getDashboardStatus();
        this.getTestRequsest();
        this.getSampleReport();
    }

    initializeGraph() {
        this.chartOptions = {
            // series: this.pieSeries,
            series:this.pieSeries,
            chart: {
                width: 350,
                type: "pie",
                fontFamily: 'Poppins',
            },
            labels: ["Completed", "Pending", "Processing", "Not Verified", "Recheck"],
            responsive: [
                {
                  breakpoint: 2000,
                  options: {
                    colors: ['#00C852', '#FFC007', '#9747FF', '#364152', '#D600C0'],
                    chart: {
                      width: 500
                    },
                    dataLabels:{enabled: false},
                    legend: {
                      fontFamily: 'Poppins',
                      position: "bottom"
                    }
                  }
                }
              ]
        };
    }
}