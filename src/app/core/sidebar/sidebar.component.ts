import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../layout/layout.component.scss', './sidebar.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    public router: Router,
    private toast: ToastService
  ) {

  }

  ngOnInit(): void { }

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
    this.router.navigate(['/dashboard/pricing']);
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
