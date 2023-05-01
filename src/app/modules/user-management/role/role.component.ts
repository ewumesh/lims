import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from 'src/app/services/user-management/role/role.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';

@Component({
  templateUrl: './role.component.html',
  styleUrls: ['./role.scss']
})
export class RoleComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private dialog: MatDialog
  ) { }

  roleForm: FormGroup;

  existingRole: any;

  displayedColumns: string[] = ['sn', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

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
    console.log(formData, "PAT")
    this.roleForm.patchValue(formData);
  }


  getUserRoles() {
    this.roleService.getUserRoles().subscribe(response => {
      this.dataSource = response;
    })
  }

  editRole(role) {
    this.existingRole = role;
    this.patchForm(role);
  }

  saveChanges() {
    if (this.existingRole?.id) {
      let payload = {
        id: this.existingRole.id,
        name: this.roleForm.value.name
      }
      this.roleService.updateUserRole(payload).subscribe(response => {
        this.getUserRoles();
        this.reset();
      })
    } else {
      this.roleService.createUserRole(this.roleForm.value).subscribe(response => {
        this.getUserRoles();
        this.reset();
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
   }
}
