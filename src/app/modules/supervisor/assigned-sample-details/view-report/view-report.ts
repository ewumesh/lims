import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignedSampleDetailsService } from 'src/app/services/supervisor/assigned-sample-details/assign-sample-details.service';
import { ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './view-report.html',
  styleUrls: ['./view-report.scss']
})
export class ViewReportComponent implements OnInit {
  isLoading: boolean = false;
  sampleParameterDetails: any;
  analystDetails: any;
  sampleDetails: any;

  constructor(
    private dialogRef: MatDialogRef<ViewReportComponent>,
    private service: AssignedSampleDetailsService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    console.log(this.data, 'DATA')

    this.getSampleDetails();
  }

  getSampleDetails() {
    this.isLoading = true;
    this.service.getSampleDetails(this.data.sampleId).subscribe(res => {
      console.log(res, 'Response..')
      this.sampleDetails = res;
      this.getParameterDetails();
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false
    })
  }

  getParameterDetails() {
   this.sampleParameterDetails =  this.sampleDetails?.parameters?.find(a => a.id === this.data?.parameterId)
   this.analystDetails = this.data?.data?.parameters.find(a => a.id === this.data?.parameterId);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
