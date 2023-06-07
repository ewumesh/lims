import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ViewUserDetailsService } from 'src/app/services/user-management/view-user/view-user.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { ViewImageComponent } from '../../my-account/view-image/view-image';
import { LayoutService } from 'src/app/core/layout.service';

@Component({
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.scss']
})
export class ViewUserDetailsComponent implements OnInit {

  userId:any;

  userDetails: any = {};
  categories:any[] = [];

  loggedUser:any;

  isApprove = false;

  roles: any[] = [];

  constructor(
    private service:ViewUserDetailsService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private dialog: MatDialog
    ) {
      this.loggedUser = JSON.parse(localStorage.getItem('userDetails'));
    }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUserDetails();
    this.gerCategories();
    this.getRoles();
  }

  approveuser() {
    this.isApprove = true;
    let payload = {
      id: this.userDetails.id,
      is_verified: 1
    }

    this.service.approveUser(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'User Approved Successfully!');
      this.getUserDetails();
      this.dismissMessage();
      this.isApprove = false;
    })
  }

  getRoles() {
    this.layoutService.getRoles().subscribe(res => {
      console.log(res, "RESPONSE")
      this.roles = res.roles;
    })
  }

  getRoleName(id) {
    let role = this.roles.find(a => a.role_id === id);
    return role?.role_name
  }

  viewImage(url) {
    let instance: MatDialogRef<ViewImageComponent, any>;

        instance = this.dialog.open(ViewImageComponent, {
          data: url ? url : null,
          width: '800px',
          autoFocus: false,
        })

        instance.afterClosed().subscribe(res => {

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
