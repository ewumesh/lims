import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MySampleService } from 'src/app/services/my-sample/my-sample.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './my-sample.component.html',
  styleUrls: ['./my-sample.component.scss'],
  animations: [collectionInOut]
})
export class MySampleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'sampleId', 'sampleName','commodity', 'submissionDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  constructor(
    private title: Title,
    private fb: FormBuilder,
    private service: MySampleService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastService
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

  reset() {
    this.filterForm.reset();
    this.getSamples();
    this.isLoading = false;
    this.isFilterBtnLoading = false;
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
      user: this.userDetails.email
    }
    this.service.getMySamples(payload).subscribe(response => {
      this.dataSource.data = response.results;
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    },(error) => {
      this.isFilterBtnLoading = false;
      this.isLoading = false;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filterUserList() {
    this.isLoading = true;
    this.isFilterBtnLoading = true;
    let payload = {
      search: this.filterForm.value.search_text,
      to: this.format(this.filterForm.value.to),
      from: this.format(this.filterForm.value.from),
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
