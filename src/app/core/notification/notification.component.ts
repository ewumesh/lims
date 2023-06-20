import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  constructor(private layoutService: LayoutService, private router: Router) { }

  // notifications:any[] = [];

  notifications = [
    // {
    //   name: 'Sample Approved by Admin.',
    //   updated: new Date('1/1/16'),
    // },
    // {
    //   name: 'User Verified by Admin',
    //   updated: new Date('1/17/16'),
    // },
    // {
    //   name: 'Sample Tested Completed.',
    //   updated: new Date('1/28/16'),
    // },
  ]

  ngOnInit(): void {
    this.getNotificationList();
   }

  getNotificationList() {
    this.layoutService.getNotification().subscribe(res => {
      this.notifications = res.results;
    })
  }

  navigateTo(path) {
    let url = path;
    console.log(path, 'path...')
    this.router.navigate([`${path}/`])
  }
}
