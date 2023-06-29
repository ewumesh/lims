import { Component, ViewChild } from "@angular/core";

import { ChartComponent } from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};

@Component({
    selector: 'user-dashboard',
    templateUrl: './user.html',
    styleUrls: ['./user.scss']
})

export class UserDashboard {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [44, 55, 13, 43, 22],
            chart: {
                width: 350,
                type: "pie"
            },
            labels: ["Completed", "Pending", "Tested", "Not Verified", "Recheck"],
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