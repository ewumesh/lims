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
    labels: any;
};
@Component({
    selector:'verifier-dashboard',
    templateUrl: './verifier.html',
    styleUrls:['./verifier.scss']
})

export class VerifierDashboard {
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
        this.router.navigate(['/dashboard/sample-verify']);
    }

    getDashboardStatus() {
        this.isDashboardStatus = true;
        this.service.getDashboardStatus().subscribe(a => {
            // a.rejected = 0;
            this.dashboardStatus = a;

            let chaartSeries = [this.calculatePercentage(a?.verified, a.total_request), this.calculatePercentage(a.not_verified, a.total_request), this.calculatePercentage(a.reckeck, a.total_request), this.calculatePercentage(a.rejected, a.total_request)];
            this.pieSeries = chaartSeries;
            this.initializeGraph();
            this.isDashboardStatus = false;
        },(error)=> {
            this.isDashboardStatus = false;
        })
    }

    getSampleRequsest() {
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
        this.service.getSmaples(payload).subscribe(res => {
          this.latestSamples = res;
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
        this.getSampleRequsest();
        this.getSampleReport();
    }

    initializeGraph() {
        this.chartOptions = {
            series: this.pieSeries,
            chart: {
                width: 350,
                type: "pie"
            },
            labels: ["Verified", "Not Verified", "Recheck", "Rejected"],
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