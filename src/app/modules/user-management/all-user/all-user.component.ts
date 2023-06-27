import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { response } from 'express';
import { AllUsersService } from 'src/app/services/user-management/all-user/all-user.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.scss'],
  animations:[collectionInOut]
})
export class AllUsersComponent implements OnInit, AfterViewInit {
  constructor(
    private title: Title,
    private allUsersService: AllUsersService,
    private dialog: MatDialog,
    private router:Router,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.title.setTitle('All Users - Laboratory Information Management System');


    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource([]);
  }

  clientCategories: any[] = [];

  displayedColumns: string[] = ['sn', 'userName', 'fullName', 'email', 'registerDate', 'userRole', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterForm: FormGroup;

  isLoading: boolean = true;
  filterBtnLoading: boolean = false;

  roles: any[] = [];

  statusList: any[] = [
    {id: 1, name: 'Pending'},
    {id: 2, name: 'Active'},
    {id:3, name: 'Suspended'},
    {id: 4, name: 'Rejected'}
  ]

  loggedUserDetails: any;

  ngOnInit(): void {
    this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.getUserRoles();
    this.initFilterForm();
    this.getClientCategories();
    this.getAllUsers();
  }

  download(fileType) {
    let payload = {
      report_type: fileType,
      report_name: 'users-list',
      report_lang: 'eng'
    }
    this.allUsersService.downloadReport(payload);
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      role: '',
      client_category_id: '',
      status: ''
    })
  }

  filterUserList() {
    this.filterBtnLoading = true;
    setTimeout(() => {
      this.filterBtnLoading = false;
    }, 1000);
  }

  getClientCategories() {
    this.allUsersService.getCategories().subscribe(response => {
      this.clientCategories = response.results;
    })
  }

  getUserRoles() {
    this.allUsersService.getUserRoles().subscribe(response => {
      this.roles = response.roles;
    })
  }

  getRoleName(id) {
    let role = this.roles.find(x => x.role_id === id);
    if(role) {
      return role.role_name;
    } else {
    return id;
    }
  }

  getAllUsers() {
    this.isLoading = true;
    let p;
    if(this.loggedUserDetails.role === 2) {
      p = {
        search: '',
        page: '',
        size: '',
        role: 5,
        client_category_id: ''
      }
    } else {
      p = {
        search: '',
        page: '',
        size: '',
        role: '',
        client_category_id: ''
      }
    }

    this.isLoading = true;
    this.allUsersService.getUsersList(p).subscribe(response => {
      this.dataSource.data = response;
      this.isLoading = false;
    })
  }

  filter() {
    this.filterBtnLoading = true;
      let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: '',
      role: this.filterForm.value.role,
      client_category_id: this.filterForm.value.client_category_id
    }
    this.isLoading = true;
    this.allUsersService.getUsersList(payload).subscribe(response => {
      this.dataSource.data = response;
      this.isLoading = false;
      this.filterBtnLoading = false;
    },(error) => {
      this.filterBtnLoading = false;
    })
  }

  resetFilter() {
    this.filterForm.reset();
    this.getAllUsers();
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  deleteUser(userId) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.allUsersService.deleteUser(userId).subscribe(response => {
          this.toast.showToast(
            TOAST_STATE.success,
            response.message);
          this.getAllUsers();

          this.dismissMessage();
        },
        (error) => {
          this.isLoading = false;
          this.toast.showToast(
            TOAST_STATE.danger,
            error?.error?.message);

            setTimeout(() => {
              this.dismissMessage();
            }, 3000);
        })
      }
    })
  }

  viewUserDetails(id) {
    this.router.navigate(['/dashboard/user-details', id]);
  }

  updateUser(user) {
    if(user.role === 5) {
      this.router.navigate(['/dashboard/update-user', user.id]);
    } else {
      this.router.navigate(['/dashboard/update-admin', user.id]);
    }
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
