import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../layout/layout.component.scss', './navbar.scss']
})
export class NavbarComponent implements OnInit {

  userDetails: any = {};

  roles: any[] = [];

  constructor(
    private router: Router,
    private layoutService: LayoutService
    ) {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userDetails = userDetails;
   }

  ngOnInit(): void {
    this.getRoles();
    this.getTokenStatus();
   }

  getRoles() {
    this.layoutService.getRoles().subscribe(res => {
      this.roles = res.roles;
    })
  }

  getRoleName(id) {
    return this.roles.find(a => a.role_id === id)?.role_name;
  }

  navigateToProfile() {
    this.router.navigate(['/dashboard/my-account']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getTokenStatus() {
    this.layoutService.getTokenStatus().subscribe(res => {
      if(res.valid === true) {

      } else {
        this.logout();
      }
    })
  }
}
