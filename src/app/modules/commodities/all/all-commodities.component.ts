import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AllCommoditiesService } from 'src/app/services/commodities/all-commodities/all-commodities.service';

@Component({
  templateUrl: './all-commodities.component.html',
  styleUrls: ['./all-commodities.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllCommoditiesComponent implements OnInit {

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['expand', 'name', 'price', 'test_duration'];
  expandedElement: any | null;

  allCommodities: any = [];

  constructor(private allCommoditiesService: AllCommoditiesService) { }

  ngOnInit(): void {
    this.getAllCommodities();
  }

  getAllCommodities() {
    this.allCommoditiesService.getAllCommodities().subscribe(res => {
      // this.allCommodities = res;
      this.dataSource = res.results;
    })
  }
}

