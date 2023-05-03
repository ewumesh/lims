import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../layout/layout.component.scss', './sidebar.scss']
})
export class SidebarComponent implements OnInit {

  userDetails:any = {};

  constructor(
    public router: Router,
    private toast: ToastService,
    private sharedService: SharedService
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log(this.userDetails, 'user...')
    // console.log(JSON.parse(localStorage.getItem('userDetails')), 'user details...');
  }

  ngOnInit(): void { }

  getUserRoles() {

  }

  navigateToSampleForm() {
    this.router.navigate(['/dashboard/add-sample']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToComodities() {
    this.router.navigate(['/dashboard/comodities']);
  }

  navigateToMySamples() {
    this.router.navigate(['/dashboard/my-samples']);
  }

  navigateToReportView() {
    this.router.navigate(['/dashboard/report-view']);
  }

  navigateToAccount() {
    this.router.navigate(['/dashboard/my-account']);
  }

  navigateToPricing() {
    this.router.navigate(['/dashboard/commodity-pricing']);
  }

  navigateToUserRequests() {
    this.router.navigate(['/dashboard/user-requests'])
  }

  navigateToSampleRequests() {
    this.router.navigate(['/dashboard/sample-requests'])
  }

  navigateToCreateUser() {
    this.router.navigate(['/dashboard/create-user']);
  }

  navigateToCreateAdmin() {
    this.router.navigate(['/dashboard/create-admin'])
  }

  navigateToAllUsers() {
    this.router.navigate(['/dashboard/all-users']);
  }

  navigateToLabReport() {
    this.router.navigate(['/dashboard/lab-report']);
  }

  navigateToSearchSample() {
    this.router.navigate(['/dashboard/search-sample']);
  }

  navigateToAssignedSample() {
    this.router.navigate(['/dashboard/assigned-sample']);
  }

  navigateToClientCategory() {
    this.router.navigate(['/dashboard/settings/client-category']);
  }

  navigateToCommodityCategory() {
    this.router.navigate(['/dashboard/settings/commodity-category']);
  }

  navigateCommoditiesParameter() {
    this.router.navigate(['/dashboard/commodities-parameter']);
  }

  navigateToCommodities() {
    this.router.navigate(['/dashboard/commodities']);
  }

  gotoRole() {
    this.router.navigate(['/dashboard/user-group']);
  }

  gotoPermission() {
    this.router.navigate(['/dashboard/user-permissions'])
  }

  gotoAllCommodities() {
    this.router.navigate(['/dashboard/commodities/all-commodities']);
  }


  logout() {
    this.toast.showToast(
      TOAST_STATE.success,
      'Logout Successfully');
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }, 1000);
  }
}
