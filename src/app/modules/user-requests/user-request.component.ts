import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserRequestsService } from 'src/app/services/user-requests/user-requests.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-name',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.scss'],
  animations: [collectionInOut]
})
export class UserRequestsComponent {

  filterForm: FormGroup;
  isLoading:boolean = true;

  userDetails: any;

  constructor(
    private title: Title,
    private userRequestsService: UserRequestsService,
    private dialog: MatDialog,
    private router:Router,
    private fb: FormBuilder
  ) {
    this.title.setTitle('All Users - Laboratory Information Management System');
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  clientCategories: any[] = [];
  roles: any[] = [];

  displayedColumns: string[] = ['sn', 'userId', 'userName', 'clientType', 'email', 'phone', 'registerDate', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isFilterBtnLoading: boolean = false;

  ngOnInit(): void {
    this.getClientCategories();
    this.getAllUsers();
    this.getAllRoles();
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search: '',
      role: '',
      client_category: '',
      from: '',
      to: ''
    })
  }

  getAllRoles() {
    this.userRequestsService.getUserRoles().subscribe(res => {
      this.roles = res.roles;
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  filter() {
    this.isFilterBtnLoading = true;
    this.isLoading = true;

    let from;
    let to;

    if(this.filterForm.value.from){
      from = this.format(this.filterForm.value.from);
    } else {
      from = '';
    }

    if(this.filterForm.value.to){
      to = this.format(this.filterForm.value.to);
    } else {
      to = '';
    }

    let payload = {
      search: this.filterForm.value.search,
      page: '',
      size: '',
      role: this.filterForm.value.role,
      from: from,
      to: to,
      clientCategory: this.filterForm.value.client_category,
    }
    this.userRequestsService.getUserRequests(payload).subscribe(response => {
      this.dataSource.data = response;
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    })
  }

  resetFilter() {
    this.filterForm.reset();
    this.getAllUsers();
  }

  getClientCategories() {
    this.userRequestsService.getCategories().subscribe(response => {
      this.clientCategories = response.results;
    })
  }

  getAllUsers() {
    this.isLoading = true;
    let payload
    if(this.userDetails.role === 1) {
      payload = {
        search: '',
        page: '',
        size: '',
        clientCategory: '',
        role: '',
        from: '',
        to:''
      }
    } else {
      payload = {
        search: '',
        page: '',
        size: '',
        clientCategory: '',
        role: '5',
        from: '',
        to:''
      }
    }

    this.userRequestsService.getUserRequests(payload).subscribe(response => {
      this.dataSource.data = response;
      this.isLoading = false;
    }, (error) => {
      this.isFilterBtnLoading = false;
      this.isLoading = false;
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

  download(type) {
    let payload = {
      report_type: type,
      report_name: 'users-list',
      report_lang: 'eng'
    }
    this.userRequestsService.downloadReport(payload);
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


