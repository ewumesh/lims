import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ViewSampleService } from 'src/app/services/user/view-sample/view-sample.service';
import { ViewPaymentReceiptComponent } from './view-payment-receipt/view-payment-receipt';

@Component({
  templateUrl: './view-sample.component.html',
  styleUrls: ['./view-sample.component.scss']
})
export class ViewSampleComponent implements OnInit {

  sampleId:any;
  sampleDetails: any;

  commodities:any[] = [];

  userDetails: any;

  constructor(
    private route: ActivatedRoute,
    private service: ViewSampleService,
    private dialog: MatDialog
    ) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.sampleId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getSampleDetails();
    this.getCommodities();
   }

   viewReceipt(url) {
    this.dialog.open(ViewPaymentReceiptComponent, {
      data: url
    })
   }

  getSampleDetails() {
    let payload = {
      id: this.sampleId
    }
    this.service.getSampleDetails(payload).subscribe(res => {
      this.sampleDetails = res;
    }, (error) => {
      // this.sampleDetails = {}
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
