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

  notifications:any[] = [];

  url:string;

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  constructor(
    private router: Router,
    private layoutService: LayoutService
    ) {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userDetails = userDetails;
    this.url = `https://ui-avatars.com/api/?name=${this.userDetails.first_name}+${this.userDetails.last_name}&rounded=true&background=FB802C&color=ffffff&size=28&bold=true`
   }

  ngOnInit(): void {
    this.getRoles();
    this.getTokenStatus();
    this.getNotificationList();
   }

   getNotificationList() {
    this.layoutService.getNotification().subscribe(res => {
      this.notifications = res.results;
    })
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
    },(error) => {
      console.log(error?.error, 'roo')

      if(error?.error?.valid === false) {
        this.logout();
      }
    })
  }
}
