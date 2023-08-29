import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MySampleService } from 'src/app/services/my-sample/my-sample.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { PrintSampleDetailsComponent } from './print/print-sample.component';


@Component({
  templateUrl: './my-sample.component.html',
  styleUrls: ['./my-sample.component.scss'],
  animations: [collectionInOut]
})
export class MySampleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName','commodity', 'submissionDate', 'status', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading: boolean = true;
  isFilterBtnLoading: boolean = false;

  statusList: any[] = [
    { id: 1, name: 'pending' },
    { id: 2, name: 'success' },
    { id: 3, name: 'rejected' },
    { id: 4, name: 'verified' },
    { id: 5, name: 'pending' },
    { id: 6, name: 'processing' }
  ];

  filterForm: FormGroup;

  userDetails: any;
  commodities:any = [];

  dummyData
  constructor(
    private title: Title,
    private fb: FormBuilder,
    private service: MySampleService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.title.setTitle('My Sample - Laboratory Information Management System');
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  ngOnInit(): void {
    this.initFilterForm();
    this.getSamples();
    this.getCommodities();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    // this.service.deleteSample(1).subscribe(res => {
    //   console.log(res)
    // })
  }

  getCommodities() {

    this.service.getAllCommodities().subscribe(res => {
      this.commodities = res.results;
    })
  }

  getCommodityName(id) {
    let commodity = this.commodities.find(x => x.id === id);
    if(commodity) {
      return commodity.name;
    }
  }

  editSampleDetails(id) {
    this.router.navigate(['/dashboard/update-sample', id])
  }

  editDftqcSample(id) {
    this.router.navigate(['/dashboard/dftqc/licensing/edit-sample', id])
  }

  viewSampleDetails(id) {
    this.router.navigate(['/dashboard/sample-details', id]);
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      search_text: '',
      status: '',
      from: '',
      to: ''
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  printDetails(data) {
    this.dialog.open(PrintSampleDetailsComponent, {
      maxHeight:'90vh',
      data:data
    })
  }

  reset() {
    this.filterForm.reset();
    this.isLoading = false;
    this.isFilterBtnLoading = false;
    this.dataSource.data = [];
    let payload = {
      search: '',
      to: '',
      from: '',
      page: '',
      size: '',
      user: this.userDetails.email,
    }

    this.service.getMySamples(payload).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response.results);
      this.dummyData = response.results;
      this.isFilterBtnLoading = false;
      this.isLoading = false;
      this.changeDetectorRefs.detectChanges();
      this.dataSource._updateChangeSubscription
      // debugger;
    },(error) => {
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    })
  }

  
  deleteSample(userId) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.service.deleteSample(userId).subscribe(response => {
          this.toast.showToast(
            TOAST_STATE.success,
            response.message);
          this.getSamples();

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

  dismissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 1500);
  }

  getSamples() {
    this.isLoading = true;
    let payload = {
      search: '',
      to: '',
      from: '',
      page: '',
      size: '',
      user: this.userDetails.email,
    }

    // this.service.getMySamples(payload).subscribe({next => this.handleResponse(this)})
    this.service.getMySamples(payload).subscribe(response => {
      console.log(response, 'response Ok ')
      this.dataSource.data = response.results;
      this.isFilterBtnLoading = false;
      this.isLoading = false;
      // console.log(response, 'DATA RESPONSE..')
    },(error) => {
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    })
  }

  handleResponse(data) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterUserList() {
    this.isLoading = true;
    this.isFilterBtnLoading = true;
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
      search: this.filterForm.value.search_text,
      to: to,
      from: from,
      page: '',
      size: '',
      user: this.userDetails.email
    }
    this.service.getMySamples(payload).subscribe(response => {
      this.dataSource = response.results;
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    }, (error) => {
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    })
  }
}
