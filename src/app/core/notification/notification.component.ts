import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  constructor(
    private layoutService: LayoutService, 
    private router: Router,
    private responsive: BreakpointObserver,
    ) { }

  @Input() notifications;
  allNotifications:any[] = [];

  breakpoints = Breakpoints;
  isMobileDevice = false;

  // notifications:any[] = [];

  // notifications = [
  //   // {
  //   //   name: 'Sample Approved by Admin.',
  //   //   updated: new Date('1/1/16'),
  //   // },
  //   // {
  //   //   name: 'User Verified by Admin',
  //   //   updated: new Date('1/17/16'),
  //   // },
  //   // {
  //   //   name: 'Sample Tested Completed.',
  //   //   updated: new Date('1/28/16'),
  //   // },
  // ]

  ngOnInit(): void {
    this.getNotificationList();

    this.responsive.observe(Breakpoints.XSmall)
    .subscribe(result => {
      console.log(result.matches, 'DEVICE....')
      if (result.matches) {
        this.isMobileDevice = true;
      }

    });
   }

   getNotificationList() {
    this.layoutService.getNotification().subscribe(res => {
      this.allNotifications = res.results;
    })
  }

  // getNotificationList() {
  //   this.layoutService.getNotification().subscribe(res => {
  //     this.notifications = res.results;
  //   })
  // }

  navigateTo(path) {
    let url = path;
    console.log(path, 'path...')
    this.router.navigate([`${path}/`])
  }
}
