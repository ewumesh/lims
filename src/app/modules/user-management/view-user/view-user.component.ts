import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ViewUserDetailsService } from 'src/app/services/user-management/view-user/view-user.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { ViewImageComponent } from '../../my-account/view-image/view-image';
import { LayoutService } from 'src/app/core/layout.service';
import { ApproveUserComponent } from './approve/approve-user.component';

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

  isLoading  = false;

  departmentTypes: any[] = [];

  constructor(
    private service:ViewUserDetailsService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private dialog: MatDialog
    ) {
      this.loggedUser = JSON.parse(localStorage.getItem('userDetails'));
      this.getDepartmentTypes();
    }

    getDepartmentName(code) {
      let d = this.departmentTypes.find(a => a.code === code);
      return d.name;
    }

    getDepartmentTypes() {
      this.service.getGetDepartmentTypes().subscribe(res => {
        this.departmentTypes = res?.department_types;
      })
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
      // console.log(res, "RESPONSE")
      this.roles = res.roles;
    })
  }

  getRoleName(id) {
    // console.log(id, "EOLE IDL")
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

  procceed(data) {
    let instance: MatDialogRef<ApproveUserComponent, any>;

    instance = this.dialog.open(ApproveUserComponent, {
      data: this.userId ? this.userId : null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getUserDetails();
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
