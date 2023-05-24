import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PermissionService } from 'src/app/services/user-management/permission/permission.service';

@Component({
  templateUrl: './set-permission.html'
})
export class SetPermissionComponent implements OnInit {

  constructor(
    private permissionService: PermissionService,
    private dialogRef: MatDialogRef<SetPermissionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    ) { }

    selectedRoles = new FormControl();

  ngOnInit(): void { }

  save() {
    let gropus: any = this.selectedRoles.value;

    const result: any = {};
    this.data.allRoles.forEach(element => {
      // gropus.forEach(e => {
      //   if(e.name === element.name) {
      //     result[element.name] = true;
      //   } else {
      //     result[element.name] = false;
      //   }
      // });

      let a = gropus.find(e => e.name === element.name);
      if(a) {
        result[element.name] = true;
      } else {
        result[element.name] = false;
      }
    });

    let payload = {
      codename: this.data.rowData.codename,
      name: this.data.rowData.name,
      permission_id: this.data.rowData.permission_id,
      groups: result
    }

    this.permissionService.savePermissions(payload).subscribe(response => {
      // this.getAllPermissions();
      this.dialogRef.close();
    })
  }


}
