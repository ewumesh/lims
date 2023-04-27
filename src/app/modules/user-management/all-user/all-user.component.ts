import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { response } from 'express';
import { AllUsersService } from 'src/app/services/user-management/all-user/all-user.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';

@Component({
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.scss']
})
export class AllUsersComponent implements OnInit, AfterViewInit {
  constructor(
    private title: Title,
    private allUsersService: AllUsersService,
    private dialog: MatDialog,
    private router:Router
  ) {
    this.title.setTitle('All Users - Laboratory Inventory Management System');


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  clientCategories: any[] = [];

  displayedColumns: string[] = ['sn', 'userId', 'userName', 'fullName', 'email', 'registerDate', 'userRole', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {
    this.getClientCategories();
    this.getAllUsers();
  }

  getClientCategories() {
    this.allUsersService.getCategories().subscribe(response => {
      this.clientCategories = response;
    })
  }

  getAllUsers() {
    this.allUsersService.getUsersList().subscribe(response => {
      this.dataSource.data = response;
    })
  }

  deleteUser(userId) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.allUsersService.deleteUser(userId).subscribe(response => {
          this.getAllUsers();
        })
      }
    })
  }

  viewUserDetails(id) {
    this.router.navigate(['/dashboard/user-details', id]);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
