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
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptionsB = {
      series: [
        {
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2]
        }
      ],
      chart: {
        height: 300,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
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
          "Sa",
          // "Aug",
          // "Sep",
          // "Oct",
          // "Nov",
          // "Dec"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
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
      }
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

  ngOnInit(): void {
    this.getDashboardStatus();
  }


}