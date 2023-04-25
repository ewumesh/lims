import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.scss']
})
export class CreateAdminComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Create Admin - Laboratory Inventory Management System');
   }

  ngOnInit(): void { }
}
