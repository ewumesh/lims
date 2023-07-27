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

  distributedSample: any = {
    ch:[],
    bi:[],
    in:[]
  }

  constructor(
    private service: LabRequestDetailsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
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

  assignAllType(data, type, testType) {
    if(type === 'ch') {

      let pm = [];
      this.distributedSample.ch.forEach(e => {
        if(!e.exist) {
          pm.push(e.id)
        }
      });

      let obj = {
        commodity: this.sampleDetails?.sample_form?.commodity?.id,
        parameter:pm,
        sample_form: this.sampleDetails?.sample_form?.id,
        supervisor_user: [this.userDetails.id],
        form_available: 'analyst',
        super_visor_sample_form: this.route.snapshot.paramMap.get('id'),
        test_type: testType
      }

      let instance: MatDialogRef<AssignComponent, any>;

      instance = this.dialog.open(AssignComponent, {
        data: obj ? obj : null,
        width: '600px',
        autoFocus: false,
      })
      
    } else if(type === 'in') {
      let pm = [];
      this.distributedSample.in.forEach(e => {
        if(!e.exist) {
          pm.push(e.id)
        }
      });

      let obj = {
        commodity: this.sampleDetails?.sample_form?.commodity?.id,
        parameter:pm,
        sample_form: this.sampleDetails?.sample_form?.id,
        supervisor_user: [this.userDetails.id],
        form_available: 'analyst',
        super_visor_sample_form: this.route.snapshot.paramMap.get('id'),
        test_type: testType
      }

      let instance: MatDialogRef<AssignComponent, any>;

      instance = this.dialog.open(AssignComponent, {
        data: obj ? obj : null,
        width: '600px',
        autoFocus: false,
      }) 
    } else if(type === 'mi') {
      let pm = [];
      this.distributedSample.bi.forEach(e => {
        if(!e.exist) {
          pm.push(e.id)
        }
      });

      let obj = {
        commodity: this.sampleDetails?.sample_form?.commodity?.id,
        parameter:pm,
        sample_form: this.sampleDetails?.sample_form?.id,
        supervisor_user: [this.userDetails.id],
        form_available: 'analyst',
        super_visor_sample_form: this.route.snapshot.paramMap.get('id'),
        test_type: testType
      }

      let instance: MatDialogRef<AssignComponent, any>;

      instance = this.dialog.open(AssignComponent, {
        data: obj ? obj : null,
        width: '600px',
        autoFocus: false,
      })

      instance.afterClosed().subscribe(a => {
        this.distributedSample = {
          ch:[],
          bi:[],
          in:[]
        };
        this.getSampleDetails();
      })
    }
  }

  assign(data, type, testType) {

    // console.log(data, 'DAATAS')
    if (type === 'i') {
      let obj = {
        commodity: data.commodity.id,
        parameter: [data.id],
        sample_form: this.sampleDetails?.sample_form?.id,
        supervisor_user: [this.userDetails.id],
        form_available: 'analyst',
        super_visor_sample_form: this.route.snapshot.paramMap.get('id'),
        test_type: testType
      }
      let instance: MatDialogRef<AssignComponent, any>;

      instance = this.dialog.open(AssignComponent, {
        data: obj ? obj : null,
        width: '600px',
        autoFocus: false,
      })

      instance.afterClosed().subscribe(a => {
        this.distributedSample = {
          ch:[],
          bi:[],
          in:[]
        };
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
        commodity: this.sampleDetails?.sample_form?.commodity?.id,
        parameter:pm,
        sample_form: this.sampleDetails?.sample_form?.id,
        supervisor_user: [this.userDetails.id],
        form_available: 'analyst',
        super_visor_sample_form: this.route.snapshot.paramMap.get('id'),
        test_type: testType
      }
      // console.log(obj, "OBJECT")

    let instance: MatDialogRef<AssignComponent, any>;

      instance = this.dialog.open(AssignComponent, {
        data: obj ? obj : null,
        width: '600px',
        autoFocus: false,
      })

      instance.afterClosed().subscribe(a => {
        this.distributedSample = {
          ch:[],
          bi:[],
          in:[]
        };
        this.getSampleDetails();
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

    this.service.getSamplesDetails(payload).subscribe(res => {
      this.sampleDetails = res;
      this.reportDetails = res;

      res.parameters.forEach(p => {
        if(p.test_type === "Instrumental") {
          this.distributedSample.in.push(p);
        } else if(p.test_type === 'Microbiological') {
          this.distributedSample.bi.push(p);
        } else if(p.test_type === 'Chemical') {
          this.distributedSample.ch.push(p);
        }

        // console.log(this.distributedSample, '()*^%')
      });
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    })
  }
}
