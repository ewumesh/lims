import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewUserDetailsService } from 'src/app/services/user-management/view-user/view-user.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.scss']
})
export class ViewUserDetailsComponent implements OnInit {

  userId:any;

  userDetails: any = {};
  categories:any[] = [];

  loggedUser:any;

  constructor(
    private service:ViewUserDetailsService,
    private route: ActivatedRoute,
    private toast: ToastService
    ) {
      this.loggedUser = JSON.parse(localStorage.getItem('userDetails'));
    }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUserDetails();
    this.gerCategories();
  }

  approveuser() {
    let payload = {
      id: this.userDetails.id,
      is_verified: 1
    }

    this.service.approveUser(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'User Approved Successfully!');
      this.getUserDetails();
    })
  }

  dismissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000)
  }

  getUserDetails() {
    this.service.getUserDetails(this.userId).subscribe(response => {
      this.userDetails = response;
    })
  }

  gerCategories() {
    this.service.getCategories().subscribe(response => {
      this.categories = response.results;
    })
  }

  getClientName(clientId) {
    return this.categories.find(c => c.id === clientId)?.name;
  }
}
