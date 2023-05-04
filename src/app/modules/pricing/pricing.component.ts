import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { PricingService } from 'src/app/services/pricing/pricing.service';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['./pricing.component.scss'],
  templateUrl: './pricing.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PricingComponent implements OnInit {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['expand', 'name', 'price', 'test_duration'];
  expandedElement: any | null;

  constructor(
    private title: Title,
    private pricingService: PricingService
    ) {
    this.title.setTitle('Pricing - Laboratory Inventory Management System');
  }

  ngOnInit(): void {
    this.getAllCommodities();
  }

  getAllCommodities() {
    this.pricingService.getAllCommodities().subscribe(res=> {
      this.dataSource = res.results;
    })
  }

}

