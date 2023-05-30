import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LabRequestDetailsService } from 'src/app/services/supervisor/lab-request-details/lab-request-details.service';
import { ViewImageComponent } from '../../my-account/view-image/view-image';
import { AssignComponent } from './component/assign.component';

@Component({
  templateUrl: './lab-request-details.html',
  styleUrls: ['./lab-request-details.scss']
})
export class LabRequestDetailsComponent implements OnInit {

  userDetails: any;

  sampleDetails: any;
  isLoading = true;
  commodities: any[] = [];

  constructor(
    private service: LabRequestDetailsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.getSampleDetails();
    this.getCommodities();
  }

  getCommodities() {
    let payload = {
      page: '',
      size:'',
      search: ''
    }

    this.service.getCommodities(payload).subscribe(res => {
      this.commodities = res.results;
    })
  }

  getCommodityName(id) {
    let commodity = this.commodities.find(a => a.id === id);
    return commodity?.name
  }

  viewImage(url) {
    let instance: MatDialogRef<ViewImageComponent, any>;

    instance = this.dialog.open(ViewImageComponent, {
      data: url ? url : null,
      width: '800px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {

    })
  }

  assign(data) {
    let instance: MatDialogRef<AssignComponent, any>;

    instance = this.dialog.open(AssignComponent, {
      data: data ? data : null,
      width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      // this.getSampleRequests();
    })
  }

  getSampleDetails() {
    let sampleId =this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    let payload = {
      page: '',
      size: '',
      supervisor: this.userDetails.id,
      search: '',
      id: sampleId
    }

    this.service.getSamples(payload).subscribe(response => {
      this.sampleDetails = response;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    })
  }
}
