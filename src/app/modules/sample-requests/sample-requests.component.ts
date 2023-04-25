import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './sample-requests.component.html',
  styleUrls: ['./sample-request.scss']
})
export class SampleRequestsComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Sample Requests - Laboratory Inventory Management System');
  }

  ngOnInit(): void { }
}
