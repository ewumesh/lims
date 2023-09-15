import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ViewSampleService } from 'src/app/services/user/view-sample/view-sample.service';
import { ViewPaymentReceiptComponent } from './view-payment-receipt/view-payment-receipt';
import  NepaliDate from 'nepali-datetime'
import { DatePipe } from '@angular/common';

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
    private pipe: DatePipe,
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
      data: url,
      width: '800px',
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

  convertToNepaliDate(enDate) {
    let nepDate:any = {};
    const eng = enDate.split('-');
    let time = this.pipe.transform(enDate, 'hh:mm:ss');
    nepDate.year = parseInt(eng[0], 10);
    nepDate.month = parseInt(eng[1], 10);
    nepDate.day = parseInt(eng[2], 10);
    nepDate.hour = Number(time.slice(0,2));
    nepDate.minute = Number(time.slice(3,5));
    let npDate = NepaliDate.fromEnglishDate(nepDate.year, nepDate.month-1, nepDate.day, nepDate.hour, nepDate.minute, 0);
    return `${npDate.year}-${npDate.month+1}-${npDate.day}`;
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
