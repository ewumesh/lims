import { DatePipe } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { LabRequestService } from "src/app/services/supervisor/lab-request/lab-request.service";
import { SupervisorReportService } from "src/app/services/supervisor/supervisor-report/service";
import { collectionInOut } from "src/app/shared/animations/animations";



@Component({
    templateUrl:'./supervisor-report.html',
    styleUrls:['./supervisor-report.scss'],
    animations:[collectionInOut]
})

export class SupervisorReportComponent {

    filterForm: FormGroup;
    isLoading:boolean = true;
    userDetails: any;
  
    isFilterBtnLoading: boolean = false;
  
    displayedColumns: string[] = ['sn', 'sampleId', 'sampleName', 'commodity', 'status', 'action'];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    statusList: any[] = [
    ];
  
    samples: any[] = []
    loggedUserDetails: any;
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private service: SupervisorReportService
      ) {
        this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
      }
  
    ngOnInit(): void {
      this.initFilterForm();
      this.getSamples();
    //   this.getStatusList();
     }
  
    //  getStatusList() {
    //   this.service.getStatusList().subscribe(res => {
    //     this.statusList = res;
    //   })
    //  }
  
     getSamples() {
      this.isLoading = true;
      let payload = {
        search: '',
        page: '',
        size: '',
        from: '',
        to: '',
        status:''
      }
      this.service.getSampleReport(payload).subscribe(response => {

        console.log( 'opoaspdo')
        // console.log(response);
        this.samples = response;
        this.dataSource.data = response;
        this.isLoading = false;
        this.isFilterBtnLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.isFilterBtnLoading = false;
      })
     }
  
     viewAssignedSampleDetails(id) {
      this.router.navigate(['/dashboard/supervisor-lab-report-details',id])
    }
  
    initFilterForm() {
      this.filterForm = this.fb.group({
        search: '',
        status:'',
        from: '',
        to: ''
      })
    }
  
    format(date: Date): string {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(date, 'yyyy-MM-dd');
    }
  
    filter() {
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
        search: this.filterForm.value.search,
        page: '',
        size: '',
        from: from,
        to: to,
        status: this.filterForm.value.status
      }
      this.service.getSampleReport(payload).subscribe(response => {
        // console.log(response);
        this.samples = response;
        this.dataSource = response;
        this.isLoading = false;
        this.isFilterBtnLoading  = false;
      },
      (error) => {
        this.isLoading = false;
        this.isFilterBtnLoading = false;
      })
    }
  
    reset() {
      this.filterForm.reset();
    }
  
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }
}