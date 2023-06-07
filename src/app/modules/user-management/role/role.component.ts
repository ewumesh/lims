import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from 'src/app/services/user-management/role/role.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';

@Component({
  templateUrl: './role.component.html',
  styleUrls: ['./role.scss'],
  animations: [collectionInOut]
})
export class RoleComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private dialog: MatDialog
  ) { }

  roleForm: FormGroup;

  existingRole: any;

  message:any = {};
  responseError = null;
  loadingFormBtn = false;

  displayedColumns: string[] = ['sn', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.initForm();
    this.getUserRoles();
  }

  private initForm() {
    this.roleForm = this.fb.group({
      name: ''
    })
  }

  private patchForm(formData) {
    this.roleForm.patchValue(formData);
  }


  getUserRoles() {
    this.roleService.getUserRoles().subscribe(response => {
      this.dataSource = response;
      this.isLoading = false;
    })
  }

  editRole(role) {
    this.existingRole = role;
    this.patchForm(role);
  }

  saveChanges() {
    this.loadingFormBtn = true;
    if (this.roleForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      window.scroll(0,0);
      this.loadingFormBtn = false;
      return;
    }

    if (this.existingRole?.id) {
      let payload = {
        id: this.existingRole.id,
        name: this.roleForm.value.name
      }
      this.roleService.updateUserRole(payload).subscribe(response => {
        this.getUserRoles();
        this.reset();
        this.loadingFormBtn = false;
        this.message = {};
        this.responseError = null;
      },(error) => {
        this.loadingFormBtn = false;
        this.message =  {};
        this.responseError = error.error;
      })
    } else {
      this.roleService.createUserRole(this.roleForm.value).subscribe(response => {
        this.getUserRoles();
        this.reset();
        this.loadingFormBtn = false;
        this.message = {};
        this.responseError = null;
      },
      (error) => {
        this.loadingFormBtn = false;
        this.message =  {};
        this.responseError = error.error;
      })
    }
  }

  deleteUserRole(id) {
    let payload = {
      id: id
    }
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.roleService.deleteUserRole(payload).subscribe(response => {
          this.getUserRoles();
        })
      }
    })
  }

  reset() {
    this.roleForm.reset();
    this.message = {};
    this.responseError = null;
   }
}
