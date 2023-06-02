import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignedSampleDetailsService } from 'src/app/services/supervisor/assigned-sample-details/assign-sample-details.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { ViewReportComponent } from './view-report/view-report';
import jsPDF from 'jspdf';
@Component({
  templateUrl: './assigned-sample-details.html',
  styleUrls: ['./assigned-sample.scss'],
  animations: [collectionInOut]
})
export class AssignedSampleDetailsComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;
  isLoading:boolean = false;
  userDetails: any;
  tStatus = 'pending'

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


  isFilterBtnLoading: boolean = false;

  displayedColumns: string[] = ['sn', 'parameter', 'assignedDate', 'assignTo', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sampleDetails: any;

  statusList: any[] = [
    { id: 1, name: 'pending' },
    { id: 2, name: 'success' },
    { id: 3, name: 'rejected' },
    { id: 4, name: 'verified' },
    { id: 5, name: 'pending' },
    { id: 6, name: 'processing' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AssignedSampleDetailsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.getAssignedSamples()
  }

  viewReport(id) {
    let sampleId =this.route.snapshot.paramMap.get('id');
    let reportData = {
      data: this.sampleDetails,
      parameterId: id,
      sampleId: sampleId
    }
    let instance: MatDialogRef<ViewReportComponent, any>;

    instance = this.dialog.open(ViewReportComponent, {
      data: reportData ? reportData : null,
      // width: '600px',
      autoFocus: false,
    })

    instance.afterClosed().subscribe(res => {
      // this.getSampleRequests();
    })
  }

  public downloadAsPDF() {
    // const doc = new jsPDF();

    // const specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // };

    // const pdfTable = this.pdfTable.nativeElement;

    // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    //   width: 190,
    //   'elementHandlers': specialElementHandlers
    // });

    // doc.save('tableToPdf.pdf');
    const doc = new jsPDF();
var parser = new DOMParser();
var data = parser.parseFromString("<body style='max-width: 1320px; margin: auto;'> <div style='text-align: center; '> <h1 style=' margin:auto; text-align: center;  font-size: 16px;'>National Food and Feed Reference Laboratory</h1> <p style='text-align: center; font-weight: bold; font-size: 20px; margin: 0;'>TEST REPORT</p> </div> ​ <div style='margin-top: 100px;'> <p style='font-size: 20px; margin:0;'>RL-079/80 ..................</p> <p style='font-size: 20px; margin:0;'>Date:</p> </div> ​ <div style='margin-top: 50px;'> <p style='font-size: 20px; margin:0;'>TO</p> <p style='font-size: 20px; margin:0;'>M/S ..............................................</p> </div> ​ <table style='width: 1320px; margin: 50px 5px 0; '> <tbody> <tr> <td style='width:50%;'> <h1 style=' font-size: 20px; padding: 0; margin: 0;'> Sample Particular:</h1> </td> <td style='width: 50%;'> <h1 style='  font-size:14px; padding: 0; margin: 0; '>Issue Date:</h1> </td> </tr> </tbody> </table> ​ <table style='width: 1320px; padding: 0 5px;border: 1px solid rgb(0, 0, 0);'> <tbody> <tr> <td style='width:50%;'> <p style=' font-size: 20px;margin: 0;padding-bottom: 15px;'> <i>Sample Registration Date:</i> </p> </td> <td style='width: 50%;'> <p style='  font-size:14px; margin: 0;padding-bottom: 15px;'> <i> Sample Code</i></p> </td> </tr> <tr> <td style='width:50%;'> <p style=' font-size: 20px; margin: 0; padding-bottom:15px ;'> <i> Condition of Packaging:</i></p> </td> <td style='width: 50%;'> <p style='  font-size:14px; margin: 0; padding-bottom:15px ; '> <i> Test Required:</i></p> </td> </tr> <tr> <td style='width:50%;'> <p style=' font-size: 20px; margin: 0; padding-bottom:15px ;'> <i> Analysis Starting Date:</i></p> </td> <td style='width: 50%;'> <p style='  font-size:14px; margin: 0; padding-bottom:15px ; '> <i> Analysis Completion Date:</i> </p> </td> </tr> </tbody> </table> ​ <h1 style='font-size: 20px; text-align: center; margin-bottom: 0;'>TEST RESULTS</h1> ​ <table style='width: 1320px; padding: 0 5px; border-collapse: collapse;'> <tbody> <tr style='border: 1px solid rgb(0, 0, 0);'> <td style='width:5%; border: 1px solid black; '> <h1 style=' font-size: 20px;margin: 5px 0; text-align:center;'> S.N. </h1> </td> <td style='width: 20%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'>Test Parameters</h1> </td> <td style='width: 25%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> Test Method</h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'>Unit</h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> Results </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> Mandatory Standard</h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'>Remark</h1> </td> </tr> <tr> <td style='width:5%; border: 1px solid black; '> <h1 style=' font-size: 20px;margin: 5px 0; text-align:center;'> 1 </h1> </td> <td style='width: 20%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'></h1> </td> <td style='width: 25%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'></h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; ' rowspan='4'> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'>`</h1> </td> </tr> <tr> <td style='width:5%; border: 1px solid black; '> <h1 style=' font-size: 20px;margin: 5px 0; text-align:center;'> 2 </h1> </td> <td style='width: 20%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'></h1> </td> <td style='width: 25%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'></h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <!-- <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 0;padding-bottom: 15px;'>`</h1> </td> --> </tr> <tr> <td style='width:5%; border: 1px solid black; '> <h1 style=' font-size: 20px;margin: 5px 0; text-align:center;'> 3 </h1> </td> <td style='width: 20%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'></h1> </td> <td style='width: 25%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'></h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <!-- <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 0;padding-bottom: 15px;'>`</h1> </td> --> </tr> <tr> <td style='width:5%; border: 1px solid black; '> <h1 style=' font-size: 20px;margin: 5px 0; text-align:center;'> 4 </h1> </td> <td style='width: 20%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'></h1> </td> <td style='width: 25%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'></h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 5px 0; text-align:center;'> </h1> </td> <!-- <td style='width: 12.5%; border: 1px solid black; '> <h1 style='  font-size:14px; margin: 0;padding-bottom: 15px;'>`</h1> </td> --> </tr> </tbody> </table> ​ ​ <table style='width: 1320px; margin: 50px 5px 0; '> <tbody> <tr> <td style='width:33.33%;'> <p style='font-size: 20px; margin: 0;  text-align: center;'>..........................</p> <p style='font-size: 20px; margin: 0;  text-align: center;'>Verified by</p> <p style='font-size: 20px; margin: 0;  text-align: center;'>( ... ... ... ... ... ... ... ... ... ... )</p> <h1 style=' font-size: 20px; padding: 0; margin: 0; text-align: center;'> Senior Food Research Officer</h1> </td> <td style='width: 33.33%;'> ​ </td> <td style='width: 33.33%;'> <p style='font-size: 20px; margin: 0;  text-align: center;'>..........................</p> <p style='font-size: 20px; margin: 0;  text-align: center;'>Authorized Signatory</p> <p style='font-size: 20px; margin: 0;  text-align: center;'>( ... ... ... ... ... ... ... ... ... ... )</p> <h1 style=' font-size: 20px; padding: 0; margin: 0; text-align: center;'>Deputy Director Genetal </h1> </td> </tr> </tbody> </table>  <div style=' margin: auto; padding-top: 15px;'> <h1 style='font-size: 20px;'> <i>Notes:</i> </h1> <ol style='list-style-type: number; padding-left: 25px;'> ​ <li style='font-size:14px; '>This report is applicable only to the sample received in the laboratory for analysis.</li> <li style='font-size:14px; '>This test report shall not be reproduced without the written approval of the laboratory. For your perusal, DG, Department of Food Technology and Quality Control, Kathmandu.</li> </ol> </div>  </body>", 'text/html')
doc.fromHTML(data.body.innerHTML, 15, 15, {
            width: 190,
});
doc.save('savePDF.pdf');
  }

  assign() {
    let sampleId =this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/dashboard/lab-sample-details',sampleId])
  }

  generateReport() {
    let sampleId =this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/dashboard/sample-report', sampleId]);
  }

  getAssignedSamples() {
    this.isLoading = true;
    let sampleId =this.route.snapshot.paramMap.get('id');
    let payload = {
      sampleId: sampleId
    }
    this.service.getAssignedSamples(payload).subscribe(res => {
      console.log(res, 'RES')
      this.dataSource.data = res.parameters;
      this.sampleDetails = res;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    })
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

    let payload = {
      page: '',
      size: '',
      search: this.filterForm.value.search,
      from : this.format(this.filterForm.value.from),
      to: this.format(this.filterForm.value.to),
      status: this.filterForm.value.status
    }
  }

  resetFilter() {
    this.filterForm.reset();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

}
