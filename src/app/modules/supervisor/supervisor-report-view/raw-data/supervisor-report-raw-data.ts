import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    template:   `
    <div class="row m-0" style="padding: 1%;">
    <div class="col-md-10">
      <h2>Raw Data Sheet</h2>
    </div>
    <div class="col-md-2 text-end">
      <button (click)="closeDialog()" class="btn btn-lims-danger btn-sm"><mat-icon aria-hidden="false" aria-label="edit"
          fontIcon="close"></mat-icon></button>
    </div>
    <hr />
    <mat-dialog-content>
      <!-- <mat-card> -->
      <!-- <div class="sample-dialog" style="border: 1px solid #0000001a;
      padding: 12px;
      border-radius: 5px;">
        <div class="row">
          <div class="col-md-6">
            <p class="title">Name of Laboratory</p>
            <h2 class="detail">N/A</h2>
          </div>
          <div class="col-md-6">
            <p class="title">Reported date </p>
            <h2 class="detail">{{data?.sample[0]?.sample_form?.created_date | date: 'medium' || 'N/A'}}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <p class="title">Sample Name</p>
            <h2 class="detail">{{data?.sample[0].sample_form.name | titlecase}}</h2>
          </div>
          <div class="col-md-4">
            <p class="title">Date of Receipt</p>
            <h2 class="detail">{{rawDatasheetDetails?.created_date | date: 'medium'}}</h2>
          </div>
          <div class="col-md-4">
            <p class="title">Sample Codes</p>
            <h2 class="detail text-uppercase">{{data?.sample[0].sample_form?.id || 'N/A'}}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <p class="title">Due Date</p>
            <h2 class="detail">{{rawDatasheetDetails?.created_date | date: 'medium'}}</h2>
          </div>
          <div class="col-md-4">
            <p class="title">Started on</p>
            <h2 class="detail">{{rawDatasheetDetails?.created_date | date: 'medium'}}</h2>
          </div>
          <div class="col-md-4">
            <p class="title">Completed on </p>
            <h2 class="detail">{{rawDatasheetDetails?.created_date | date: 'medium'}}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p class="title">Parameters to be analyzed</p>
            <h2 class="detail">N/A</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p class="title">Method of Analysis/Testing</p>
            <h2 class="detail">N/A</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p class="title">RAW DATA (Observations, Readings, calculations etc.) </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6" *ngFor="let p of rawDatasheetDetails?.raw_data">
            <hr/>
            <div class="formula">
              <h2>{{p.parameter?.name}}</h2>
              <div>
              <div *ngIf="p?.parameter?.formula_notation">
                <div *ngFor="let n of splitStringByComma(p?.parameter?.formula_notation)">
                  <span class="text-danger">*</span>{{n | titlecase}}
                </div>
                </div>
                <h2>Formula = {{p?.parameter?.formula}}</h2>
                <h2>Result = {{p?.result || 'N/A'}}</h2>
                                      <h2>Final Result = {{p?.converted_result || 'N/A'}}</h2>
                                      <div *ngIf="p.additional_info">Additional Info: {{p.additional_info || 'N/A'}}</div>
                                      <h2 *ngIf="p.analyst_remarks">Qualitative Analysis = 
                                        <span *ngIf="p?.analyst_remarks" [innerHtml]="p?.analyst_remarks"></span>
                                        <span *ngIf="!p?.analyst_remarks">N/A</span>
                                    </h2>
              </div>
              <div *ngIf="!p?.parameter?.formula_notation" class="text-muted">N/A</div>
            </div>
          </div>
  
          <div class="col-md-12">
            <h3 class="text-bold">Remarks</h3>
            <p>{{rawDatasheetDetails?.remarks}}</p>
          </div>
  
        </div>
      </div> -->
  
      <table  class="top-table">
        <tr >
            <td style="width:11%; padding: 6px; position: relative;">
                <img src="https://logos-download.com/wp-content/uploads/2021/07/Emblem_of_Nepal.png" alt="logo" style="width: 60px;">
            </td>
            <td style="width: 70%;  border-right: 0;">
                <h2 >National Food and Feed Reference Laboratory  </h2>
                <p>DFTQC, Kathmandu, Nepal</p>
            </td>
            <td style=" border-left: 0;">
                <p >{{data?.id}}</p>
            </td>
        </tr>
  </table>
  
  <h2 class="heading" >NFFRL/SR/7.5/03: RAW DATA WORKSHEET (Chemical)</h2>
  
  <table style="width: 100%;" class="bottom-table">
    <tr>
        <th class="text-center" >S.N.</th>
        <th colspan="5"> Name of Laboratory: <span class="detail"> N/A </span></th>
        <th colspan="4"> Reported date:<span class="detail"> N/A</span> </th>
    </tr>
    <tr>
        <td class="text-center">1</td>
        <td colspan="3">Sample Name: <span class="detail"> {{data?.sample_form?.name || 'N/A'}} </span></td>
        <td colspan="3"> Date of Receipt: <span class="detail"> {{data?.created_date | date: 'medium'}}  </span></td>
        <td colspan="3"> Sample Codes: <span class="detail"> {{data?.sample_form?.id || 'N/A'}} </span></td>
    </tr>
  
    <tr>
        <td class="text-center">2</td>
        <td colspan="3">Due Date:<span class="detail"> {{data?.created_date | date: 'medium'}} </span></td>
        <td colspan="3">Started on:<span class="detail"> {{data?.created_date | date: 'medium'}} </span></td>
        <td colspan="3">Completed on:<span class="detail"> {{data?.created_date | date: 'medium'}} </span></td>
    </tr>
  
    <tr>
        <td class="text-center">3</td>
        <td colspan="10">Parameters to be analyzed:<span class="detail"> <span *ngFor="let a of data?.raw_data">{{a.parameter?.name}},</span> </span></td>
    </tr>
    <tr>
        <td class="text-center">4</td>
        <td colspan="10">Method of Analysis/Testing: <span class="detail"> N/A </span></td>
    </tr>
  
    <tr style="border-bottom: none;">
        <td style=" border-bottom: none;" class="text-center"> 5</td>
        <td colspan="10" style="border-bottom: none;" >RAW DATA (Observations, Readings, calculations etc.): <span class="detail"> N/A </span>
  
        </td>
    </tr>
  
    <tr style="border-top: none; border-bottom: none;">
        <td style="border-top: none; border-bottom:none;"></td>
        <td colspan="10" style="border-top: none; border-bottom:none;">
            <div class="row m-2">
                <div class="col-md-12" *ngFor="let p of data?.raw_data">
                    <hr />
                    <div class="row">
                      <div class="col-md-6">
                        <div class="formula">
                          <h2>{{p.parameter?.name}}</h2>
                          <div *ngIf="p?.parameter?.formula_notation">
                            <div *ngFor="let n of splitStringByComma(p?.parameter?.formula_notation)">
                              <span class="text-danger">*</span>{{n | titlecase}}
                            </div>
                            <h2>Formula = {{p?.parameter?.formula}}</h2>
                          </div>
                          <div *ngIf="!p?.parameter?.formula_notation" class="text-muted">N/A</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div *ngFor="let item of parseJSON(p?.input_fields_value) | keyvalue">
                          <span>{{item.key}}</span> = <span>{{item.value}}</span>
                     </div>
                     <div>Result: {{p.result}}</div>
                      </div>
                    </div>
                </div>
                <!-- <div class="col-md-6">
                    <div class="formula">
                        <h2>Parameter Name</h2>
                        <p> <span>w =</span> Weight = <span>120</span></p>
                        <p><span>b =</span>Height = <span>30</span></p>
                        <h2>Formula = <span>(W*B) / 100</span> = 36 unit</h2>
                    </div>
                </div> -->
            </div>
            <!-- <div class="row m-2">
                <div class="col-md-6">
                    <div class="formula">
                        <h2>Parameter Name</h2>
                        <p> <span>w =</span> Weight = <span>120</span></p>
                        <p><span>b =</span>Height = <span>30</span></p>
                        <h2>Formula = <span>(W*B) / 100</span> = 36 unit</h2>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="formula">
                        <h2>Parameter Name</h2>
                        <p> <span>w =</span> Weight = <span>120</span></p>
                        <p><span>b =</span>Height = <span>30</span></p>
                        <h2>Formula = <span>(W*B) / 100</span> = 36 unit</h2>
                    </div>
                </div>
            </div> -->
        </td>
    </tr>
  
    <tr>
        <td class="text-center">6</td>
        <td colspan="10">
            <div class="row">
                <div class="col-md-6"> Name and Signature of analyst:  <span class="detail"> {{data?.analyst_user.first_name}} {{data?.analyst_user.last_name}} </span></div>
                <div class="col-md-6">Verified by: <span class="detail">N/A </span></div>
            </div>
        </td>
    </tr>
    <tr>
        <td class="text-center">7</td>
        <td colspan="10">Remarks (If any):<span class="detail"> {{data?.remarks}} </span> </td>
    </tr>
  </table>
      <!-- </mat-card> -->
    </mat-dialog-content>
    <hr />
  
    <mat-dialog-actions align="end">
      <button (click)="closeDialog()" class="btn btn-danger btn-sm mx-1">Close</button>
      <!-- <button (click)="download()" class="btn btn-secondary btn-sm mx-1">Download</button> -->
      <!-- <button class="btn btn-primary btn-sm mx-1">
        <span *ngIf="!isLoading">Save</span>
        <span *ngIf="isLoading">
          <i class="fa fa-circle-o-notch fa-spin"></i> Loading...
        </span>
      </button> -->
    </mat-dialog-actions>
  </div>
  
    `,
    styles:[`

    .formula{
        margin-bottom: 1rem;
      }
      
      .formula > *{
        margin-bottom: 3px;
      }
      .formula h2{
        font-size: 1rem;
        font-family: poppins;
        font-weight: 600;
      
      }
      
      .formula p{
        font-size: 1rem;
        font-family: poppins;
        font-weight: 500;
      }
      
      td , th{
        border: 1px solid black;
        text-align: left;
        padding: 4px 2px;
        font-weight: 600;
      }
      
      .top-table{
      width: 100%;
      }
      
      .top-table h2{
      font-size: 20px;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      }
      
      .top-table p{
      font-size: 20px ;
      font-weight: 400;
      line-height: 1;
      text-align: center;
      }
      
      .heading{
      font-size: 22px;
      font-weight: 600;
      text-align: center;
      margin: 10px 0;
      }
      
      .bottom-table .detail{
      font-weight: 500;
      }
      
      .text-center{
      text-align: center;
      }
      
      .top-table img{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      }
      
    `]
})

export class SupervisorReportViewRawDataComponent implements OnInit {

    rawDatasheetDetails: any

    constructor(
        private dialogRef: MatDialogRef<SupervisorReportViewRawDataComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
    ) { 
        // console.log(this.data, 'MY DATA...')
    }

    ngOnInit(): void {

    }

    splitStringByComma(input: string): string[] {
        const result: string[] = input?.split(',');
        return result;
    }

    parseJSON(data) {
        // console.log(JSON.parse(data), 'oi')
        return JSON.parse(data);
    }

    closeDialog() {
        this.dialogRef.close();
    }

}