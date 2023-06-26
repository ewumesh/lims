import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LabRequestDetailsService } from 'src/app/services/supervisor/lab-request-details/lab-request-details.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { ViewImageComponent } from '../../my-account/view-image/view-image';
import { AssignComponent } from './component/assign.component';

@Component({
  templateUrl: './lab-request-details.html',
  styleUrls: ['./lab-request-details.scss'],
  animations: [collectionInOut]
})
export class LabRequestDetailsComponent implements OnInit {

  displayedColumns: string[] = ['sn', 'testType', 'parameterName', 'method', 'analyst','action'];
  dataSource = new MatTableDataSource<any>();

  userDetails: any;

  sampleDetails: any;
  reportDetails: any;
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
      size: '',
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

  assign(data, type) {
    if (type === 'i') {
      let obj = {
        commodity: this.sampleDetails.commodity.id,
        parameter: [data.id],
        sample_form: this.sampleDetails.id,
        supervisor_user: [this.userDetails.id],
        form_available: 'analyst',
      }
      let instance: MatDialogRef<AssignComponent, any>;

      instance = this.dialog.open(AssignComponent, {
        data: obj ? obj : null,
        width: '600px',
        autoFocus: false,
      })

      instance.afterClosed().subscribe(res => {
        this.getSampleDetails();
      })
    } else {
      let pm = [];
      this.sampleDetails.parameters.forEach(e => {
        if(!e.exist) {
          pm.push(e.id)
        }
      });

      let obj = {
        commodity: this.sampleDetails.commodity.id,
        parameter:pm,
        sample_form: this.sampleDetails.id,
        supervisor_user: [this.userDetails.id],
        form_available: 'analyst',
      }

    let instance: MatDialogRef<AssignComponent, any>;

      instance = this.dialog.open(AssignComponent, {
        data: obj ? obj : null,
        width: '600px',
        autoFocus: false,
      })
    }
  }

  getSampleDetails() {
    let sampleId = this.route.snapshot.paramMap.get('id');
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
      this.reportDetails = response;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    })
  }
}
