import { Component, OnInit, ViewChild } from "@angular/core";
import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";

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

export type ChartOptionsForBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  legend:any;
};
@Component({
  selector: 'supervisor-dashboard',
  templateUrl: './supervisor.html',
  styleUrls: ['./supervisor.scss']
})

export class SupervisorDashboard implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartD") chartD: ChartComponent;
  public chartOptionsD: Partial<ChartOptions>;

  @ViewChild("chartV") chartB: ChartComponent;
  public chartOptionsB: Partial<ChartOptionsForBar>;

  dashboardStatus: any;
  isDashboardStatus = false;
  pieSeries: any[] = [];

  constructor(private service: DashboarService) {


    this.chartOptionsD = {
      series: [44, 55, 13],
      chart: {
        type: "donut",
        fontFamily: 'Poppins',
        sparkline: {
          enabled: true
        }
      },
      labels: ["Chemical Test", "Microbiology Test", "Instrumental Test"],
      
      responsive: [
        {
          breakpoint: 2000,
          options: {
            colors: ['#3B82F6', '#F59E0B', '#14B8A6'],
            chart: {
              width: 300
            },
            dataLabels:{enabled: false},
            legend: {
              fontFamily: 'Poppins',
              position: "bottom"
            },    
          }
        }
      ]
    };

    this.chartOptionsB = {
      series: [
        {
          name: "Report Generation",
          data: [10, 12, 4, 7, 17, 36, 22]
        }
      ],
      chart: {
        height: 300,
        type: "bar",
        fontFamily: 'Poppins',
        toolbar: {
          show: false
        }
        
      },
      plotOptions: {
        bar: {
          borderRadius: 12,
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: false,
        // formatter: function (val) {
        //   return val + "%";
        // },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        }
      },

      xaxis: {
        categories: [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ],
        position: "bottom",
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
          offsetY: -35
        }
      },
      fill: {
        type: "color",
        
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          
          // formatter: function (val) {
          //   return val + "%";
          // }
        }
      },
      title: {
        text: "",
        floating: false,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      },
      
      
    };
  }


  getDashboardStatus() {
    this.isDashboardStatus = true
    this.service.getDashboardStatus().subscribe(a => {
      this.dashboardStatus = a;

      let chaartSeries = [this.calculatePercentage(a.completed, a.total_request), this.calculatePercentage(a.pending, a.total_request), this.calculatePercentage(a.not_verified, a.total_request), this.calculatePercentage(a.recheck, a.total_request)];
      this.pieSeries = chaartSeries;
      this.isDashboardStatus = false;
      this.initPieChart();
    },(error) => {
      this.isDashboardStatus = false;
    })
  }

  calculatePercentage(value, total) {
    let percentage = (value / total) * 100;
    return percentage;
  }

  initPieChart() {
    this.chartOptions = {
      series: [50, 20, 10, 7, 3],
      // series: this.pieSeries,
      chart: {
        width: 350,
        type: "pie",
        fontFamily: 'Poppins',
      },
      labels: ["Completed", "Pending", "Not Verified", "Recheck", "Rejected"],
      
      responsive: [
        {
          breakpoint: 2000,
          
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
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.getDashboardStatus();
  }


}