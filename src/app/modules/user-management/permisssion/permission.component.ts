import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionService } from 'src/app/services/user-management/permission/permission.service';

@Component({
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.scss']
})
export class PermissionComponent implements OnInit, AfterViewInit {

  constructor(private premissionService: PermissionService) { }

  displayedColumns: string[] = ['sn', 'name', 'contentType'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  roles: any[];

  ngOnInit(): void {
    this.getUserRoles();
    this.getAllPermissions();
  }

  generateColumn() {
    let column = [];
    column.push('sn');
    console.log(this.roles, 'Roles')
    for(let i=0; i<=this.roles.length-1;i++) {
      console.log(this.roles[i], 'role')
      column.push(this.roles[i].name);
    }
    column.push('action');
    console.log(column, 'Columns')
  }

  getUserRoles() {
    this.premissionService.getUserRoles().subscribe(response => {
      this.roles = response;
      this.generateColumn();
    })
  }

  getAllPermissions() {
    this.premissionService.getPermissions().subscribe(response => {
      this.dataSource = response;
    })
  }

  ngAfterViewInit(): void {
    // console.log(this.roles)
    // if(this.roles.length > 0) {

    // }
  }
}
