import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../layout/layout.component.scss']
})
export class NavbarComponent implements OnInit {

  userDetails: any = {};

  constructor(private router: Router) {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userDetails = userDetails;
   }

  ngOnInit(): void { }

  navigateToProfile() {
    this.router.navigate(['/dashboard/my-account']);
  }
}
