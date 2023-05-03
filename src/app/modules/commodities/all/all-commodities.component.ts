import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

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

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['expand', 'commodities', 'pricing', 'duration'];
  expandedElement: any | null;

  constructor() { }

  ngOnInit(): void { }
}

const ELEMENT_DATA:any[] = [
  {
    commodities: 'Milk',
    pricing: 'Rs. 8980000',
    duration: '44 Days',
  }
];
