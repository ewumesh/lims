import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Dashboard - Laboratory Inventory Management System');
   }

  ngOnInit(): void { }
}
