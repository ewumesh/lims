import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

const NepaliDate = require('nepali-date');

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../layout/layout.component.scss', './sidebar.scss'],
})
export class SidebarComponent implements OnInit {

  userDetails: any = {};

  activatedRoute: string = '';

  date = new Date();

  d1 = new NepaliDate(new Date());

  panelOpenState = false;  

  con(d) {
    return d.format('mmmm d, yyyy ddd');
  }

  constructor(
    public router: Router,
    private toast: ToastService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    // public datepipe: DatePipe
  ) {
    setInterval(() => {
      this.date = new Date();
    }, 1);
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.router.events.subscribe(a => {
      this.activatedRoute = this.router.url.split('?')[0];
    });
  }

  ngOnInit(): void { }

  userSampleDetails = '/dashboard/sample-details/';

  routes = [
    // user pages
    // { id: 1, role: 5, pathName: 'My Sample', path: '/dashboard/my-sample', icon: 'local_drink', subRoutes: [], dropdownId: '' },
    // { id: 2, role: 5, pathName: 'Commodity Pricing', path: '/dashboard/commodity-pricing', icon: 'insert_chart', subRoutes: [], dropdownId: '' },
    // { id: 3, role: 5, pathName: 'Sample Report', path: '/dashboard/report-view', icon: 'file_copy', subRoutes: [], dropdownId: '' },

    //supervisor pages
    // { id: 4, role: 3, pathName: 'Sample Request', path: '/dashboard/samples', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // { id: 5, role: 3, pathName: 'Assigned Sample', path: '/dashboard/assigned-sample', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // { id: 6, role: 3, pathName: 'Sample Report', path: '/dashboard/lab-report', icon: 'file_copy', subRoutes: [], dropdownId: '' },

    // analyst pages
    // { id: 7, role: 4, pathName: 'Test Request', path: '/dashboard/test-request', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // { id: 8, role: 4, pathName: 'Test Report', path: '/dashboard/lab-report', icon: 'file_copy', subRoutes: [], dropdownId: '' },

    // verifier pages
    // { id: 9, role: 6, pathName: 'Sample Verify', path: '/dashboard/sample-verify', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // { id: 10, role: 6, pathName: 'Verified Report', path: '/dashboard/lab-report', icon: 'file_copy', subRoutes: [], dropdownId: '' },

    // smu pages
    // { id: 191, role: 2, pathName: 'User Request', path: '/dashboard/user-requests', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // { id: 9876, role: 2, pathName: 'Track Sample', path: '/dashboard/track-sample', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // { id: 192, role: 2, pathName: 'Sample Request', path: '/dashboard/sample-requests', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // {
    //   id: 193, role: 2, pathName: 'User Management', path: '', icon: 'supervised_user_circle', dropdownId: 'collapsepoaopoppo',
    //   subRoutes: [
    //     { id: 1, pathName: 'All User', path: '/dashboard/all-users' },
    //     { id: 2, pathName: 'Create User', path: '/dashboard/create-user' }
    //   ]
    // },
    // { id: 195, role: 2, pathName: 'Lab Report', path: '/dashboard/lab-report', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // {
    //   id: 196, role: 2, pathName: 'Commodities', path: '', icon: 'supervised_user_circle', dropdownId: 'commoditiesId',
    //   subRoutes: [
    //     { id: 1, pathName: 'All', path: '/dashboard/commodities/all-commodities' },
    //     { id: 2, pathName: 'Category', path: '/dashboard/settings/commodity-category' },
    //     { id: 3, pathName: 'Commodities', path: '/dashboard/commodities' },
    //     { id: 4, pathName: 'Parameter', path: '/dashboard/commodities-parameter' },
    //   ]
    // },

    // admin pages
    // { id: 11, role: 1, pathName: 'User Request', path: '/dashboard/user-requests', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // { id: 10901, role: 1, pathName: 'Track Sample', path: '/dashboard/track-sample', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // { id: 12, role: 1, pathName: 'Sample Request', path: '/dashboard/sample-requests', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // {
    //   id: 13, role: 1, pathName: 'User Management', path: '', icon: 'supervised_user_circle', dropdownId: 'collapsepoaopoppo',
    //   subRoutes: [
    //     { id: 1, pathName: 'All User', path: '/dashboard/all-users' },
    //     { id: 2, pathName: 'Create User', path: '/dashboard/create-user' }
    //   ]
    // },
    // { id: 14, role: 1, pathName: 'Search Sample', path: '/dashboard/search-sample', icon: 'file_copy', subRoutes: [], dropdownId: '' },
    // {
    //   id: 160, role: 1, pathName: 'Settings', path: '', icon: 'settings', dropdownId: 'setting',
    //   subRoutes: [
    //     { id: 1, pathName: 'Client Categories', path: '/dashboard/settings/client-category' },
    //     { id: 2, pathName: 'Group', path: '/dashboard/user-group' },
    //     { id: 3, pathName: 'Permission', path: '/dashboard/user-permissions' },
    //     // { id: 4, pathName: 'Parameter', path: '/dashboard/commodities-parameter' },
    //   ]
    // },
    // { id: 15, role: 1, pathName: 'Lab Report', path: '/dashboard/lab-report', icon: 'file_copy', subRoutes: [], dropdownId: '' },

    // {
    //   id: 16, role: 1, pathName: 'Commodities', path: '', icon: 'supervised_user_circle', dropdownId: 'commoditiesId',
    //   subRoutes: [
    //     { id: 1, pathName: 'All', path: '/dashboard/commodities/all-commodities' },
    //     { id: 2, pathName: 'Category', path: '/dashboard/settings/commodity-category' },
    //     { id: 3, pathName: 'Commodities', path: '/dashboard/commodities' },
    //     { id: 4, pathName: 'Parameter', path: '/dashboard/commodities-parameter' },
    //   ]
    // },
  ]

  navigate(path) {
    this.router.navigate([`${path}`]);
  }


  logout() {
    this.toast.showToast(
      TOAST_STATE.success,
      'Logout Successfully');
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.toast.dismissToast();
    }, 1000);
  }
}
