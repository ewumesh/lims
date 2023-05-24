import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SampleRequestDetailsService } from 'src/app/services/sample-request-details/sample-request-details.service';
import { AssignSampleDialogComponent } from './payment/assign-sample-dialog.component';
import { AssignSampleComponent } from './assign/assign-sample.component';

@Component({
  templateUrl: './sample-request-details.html',
  styleUrls: ['./sample-request.scss']
})
export class SampleRequestDetailsComponent implements OnInit {

  sampleId:any;
  sampleDetails: any;

  commodities:any[] = [];

  constructor(
    private service: SampleRequestDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
    ) {
    this.sampleId = this.route.snapshot.paramMap.get('id');
   }

   pay() {
        let instance: MatDialogRef<AssignSampleDialogComponent, any>;

    instance = this.dialog.open(AssignSampleDialogComponent, {
      data: this.sampleDetails ? this.sampleDetails : null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      this.getSampleDetails();
    })
   }

   assign() {
    let instance: MatDialogRef<AssignSampleComponent, any>;

    instance = this.dialog.open(AssignSampleComponent, {
      data: this.sampleDetails ? this.sampleDetails : null,
      width: '600px',
      autoFocus: false,
    })
    instance.afterClosed().subscribe(res => {
      // this.getSampleDetails();
      this.router.navigate(['/dashboard/sample-requests'])
    })
   }

  ngOnInit(): void {
    this.getSampleDetails();
    this.getCommodities();
   }

  getSampleDetails() {
    let payload = {
      id: this.sampleId
    }
    this.service.getSampleDetails(payload).subscribe(res => {
      this.sampleDetails = res;
    })
  }

  getCommodityName(id) {
    let commodity = this.commodities.find(a => a.id === id);
    return commodity?.name
  }

  getCommodities() {
    let payload = {
      search: '',
      page: '',
      size:''
    }

    this.service.getCommodities(payload).subscribe(res =>{
      this.commodities = res.results;
    })
  }
}
