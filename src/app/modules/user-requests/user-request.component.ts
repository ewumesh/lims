import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserRequestsService } from 'src/app/services/user-requests/user-requests.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-name',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.scss']
})
export class UserRequestsComponent {

  constructor(
    private title: Title,
    private userRequestsService: UserRequestsService,
    private dialog: MatDialog,
    private router:Router
  ) {
    this.title.setTitle('All Users - Laboratory Inventory Management System');


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  clientCategories: any[] = [];

  displayedColumns: string[] = ['sn', 'userId', 'userName', 'clientType', 'email', 'phone', 'registerDate', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {
    this.getClientCategories();
    this.getAllUsers();
  }

  getClientCategories() {
    // this.userRequestsService.getCategories().subscribe(response => {
    //   this.clientCategories = response.results;
    // })
  }

  getAllUsers() {
    let payload = {
      search: '',
      page: '',
      size: '',
      cilent_category: '',
      role: ''
    }
    this.userRequestsService.getUserRequests(payload).subscribe(response => {
      this.dataSource.data = response;
    })
  }

  deleteUser(userId) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      // if (_) {
      //   this.userRequestsService.deleteUser(userId).subscribe(response => {
      //     this.getAllUsers();
      //   })
      // }
    })
  }

  viewUserDetails(id) {
    this.router.navigate(['/dashboard/user-details', id]);
  }

  updateUser(id) {
    this.router.navigate(['/dashboard/update-user', id]);
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


