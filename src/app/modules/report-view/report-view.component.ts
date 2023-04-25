import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Report View - Laboratory Inventory Management System');
  }

  ngOnInit(): void { }
}
