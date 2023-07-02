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
    selector:'smu-dashboard',
    templateUrl: './smu.html',
    styleUrls:['./smu.scss']
})

export class SmuDashboard {
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    @ViewChild("chartV") chartB: ChartComponent;
    public chartOptionsB: Partial<ChartOptions>;

    isDashboardStatus = false;
    dashboardStatus:any;
    pieSeries:any[] =[];

    loadingCompletedSample = false;
    completedSamples:any[] = [];
    isLoadingDownloadBtn = false;
    loadingLatestSample = false;
    latestSamples:any[] = [];
    userDetails:any;

    userRequests:any[] = [];
    isLoadingUserRequests = false;

    constructor(
        private service: DashboarService,
        private router: Router
        ) {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

        this.chartOptionsB = {
            series: [44, 15, 13, 40],
            chart: {
              type: "donut",
              fontFamily: 'Poppins',
              sparkline: {
                enabled: true
              }
            },
            labels: ["Industry", "Importer/Expoter", "Government Agency", "DFTQC Office"],
            
            responsive: [
              {
                breakpoint: 2000,
                options: {
                  colors: ['#010080', '#4682b4', '#476ee2', '#0000fe'],
                  chart: {
                    width: 300
                  },
                  dataLabels:{enabled: false},
                  legend: {
                    fontFamily: 'Poppins',
                    position: "middle"
                  },    
                }
              }
            ]
          };
    }

    getUserRequests() {
        this.isLoadingUserRequests = true;
        let payload = {
            search: '',
            page: '',
            size: '',
            clientCategory: '',
            role: '5',
            from: '',
            to:''
        }

        this.service.getUserRequests(payload).subscribe(res => {
            this.userRequests = res.slice(0,10);
            this.isLoadingUserRequests = false;
        },(error) => {
            this.isLoadingUserRequests = false;
        })
    }

    gotoReport() {
        this.router.navigate(['/dashboard/lab-report']);
    }

    gotoRequest() {
        this.router.navigate(['/dashboard/sample-requests']);
    }

    gotoUserRequest() {
        this.router.navigate(['/dashboard/user-requests']);
    }

    getDashboardStatus() {
        this.isDashboardStatus = true;
        this.service.getDashboardStatus().subscribe(a => {
            // a.rejected = 0;
            this.dashboardStatus = a;

            let chaartSeries = [this.calculatePercentage(a?.completed, a.total_request), this.calculatePercentage(a.processing, a.total_request), this.calculatePercentage(a.pending, a.total_request), this.calculatePercentage(a.reject, a.total_request)];
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
        this.service.getAllSampleRequsets(payload).subscribe(res => {
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
        this.getSampleRequsest();
        this.getSampleReport();
        this.getUserRequests();
    }

    initializeGraph() {
        this.chartOptions = {
            // series: this.pieSeries,
            series: [50, 20, 10, 7, 3],
            chart: {
                width: 350,
                type: "pie",
                fontFamily: 'Poppins',
            },
            labels: ["Completed", "Pending", "Not Verified", "Recheck", "Rejected"],
            responsive: [
                {
                    breakpoint: 2000,
<<<<<<< HEAD
                    
                    options: {
                      colors: ['#00C852', '#FFC007', '#364152', '#D600C0', '#C62828'],
                      chart: {
                        width: 450
                      },
                      dataLabels:{enabled: false},
                      legend: {
                        fontFamily: 'Poppins',
                        position: "bottom"
                      }
=======
                    options: {
                        dataLabels:{enabled: false},
                        chart: {
                            width: 450
                        },
                        legend: {
                            fontFamily: 'Poppins',
                            position: "bottom"
                        }
>>>>>>> 77a3af35e17ebd4d61cba6db8db2d481a5940a98
                    }
                  }
            ]
        };
    }
}