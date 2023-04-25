import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Title } from '@angular/platform-browser';

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
export class PricingComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['expand', 'commodities', 'rate', 'duration'];
  expandedElement: any | null;

  constructor(private title: Title) {
    this.title.setTitle('Pricing - Laboratory Inventory Management System');
  }
}

const ELEMENT_DATA:any[] = [
  {
    commodities: 'Milk',
    rate: '8980000',
    duration: '44 Days',
  }
];

