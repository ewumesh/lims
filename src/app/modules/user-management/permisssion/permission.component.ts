import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, delay, map, takeUntil } from 'rxjs';
import { PermissionService } from 'src/app/services/user-management/permission/permission.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { SetPermissionComponent } from './dialog/set-permission';

export interface columnModel {
  name: string;
  value: string
}

@Component({
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.scss'],
  animations: [collectionInOut]
})
export class PermissionComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private premissionService: PermissionService,
    private dialog: MatDialog
    ) { }

  displayedColumns: string[];

  tableColumns: string[] = ['sn', 'permission', 'role', 'action']

  additionalColumns: string[];
  dataSource: MatTableDataSource<any>;

  allPermissions: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly toDestroy$ = new Subject<void>();

  roles: any[];
  selectedRoles = new FormControl();


  ngOnInit(): void {
    this.getUserRoles();
    this.getAllPermissions();
  }

  generateColumn() {
    let column = [];
    column.push('sn');
    column.push('name');
    for (let i = 0; i <= this.roles.length - 1; i++) {
      column.push(this.roles[i].name);
    }
    this.additionalColumns = column;
    this.displayedColumns = column;
  }

  createObject(keys: string[], values: any[]): any {
    if (keys.length !== values.length) {
      throw new Error('Keys and values arrays must have the same length.');
    }

    const result: any = {};
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = values[i];
    }
    return result;
  }

  save(data) {

    let value = {rowData: data, allRoles: this.roles}

    let instance: MatDialogRef<SetPermissionComponent, any>;
    instance = this.dialog.open(SetPermissionComponent, {
      width:'500px',
      data: value ? value : {},
      autoFocus: false,
    });

    instance.afterClosed().subscribe(result => {
      this.getAllPermissions();
    });

    // let gropus: any = this.selectedRoles.value;

    // const result: any = {};
    // this.roles.forEach(element => {
    //   // gropus.forEach(e => {
    //   //   if(e.name === element.name) {
    //   //     result[element.name] = true;
    //   //   } else {
    //   //     result[element.name] = false;
    //   //   }
    //   // });

    //   let a = gropus.find(e => e.name === element.name);
    //   if(a) {
    //     result[element.name] = true;
    //   } else {
    //     result[element.name] = false;
    //   }
    // });

    // console.log(this.selectedRoles.value, 'asas')

    // let payload = {
    //   codename: data.codename,
    //   name: data.name,
    //   permission_id: data.permission_id,
    //   groups: result
    // }

    // console.log(payload, 'payload..')

    // this.premissionService.savePermissions(payload).subscribe(response => {
    //   console.log(response, 'success')
    //   this.getAllPermissions();
    // })
  }

  getUserRoles() {
    this.premissionService.getUserRoles().pipe(map(res => {
      return res;
    })).subscribe(response => {
      this.roles = response;
      this.generateColumn();
    })
  }

  getAllPermissions() {
    this.premissionService.getPermissions().subscribe(response => {
      this.dataSource = response;
      this.allPermissions = response;
    })
  }

  ngAfterViewInit(): void {
    // console.log(this.roles)
    // if(this.roles.length > 0) {

    // }
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
