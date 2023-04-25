import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.scss']
})
export class CreateUserComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Create User - Laboratory Inventory Management System');
  }

  ngOnInit(): void { }
}
