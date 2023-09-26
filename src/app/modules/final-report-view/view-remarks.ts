import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  template:`
  <div class="row m-0" style="padding: 3%;">
  <div class="col-md-10">
    <h2>Remarks</h2>
  </div>
  <div class="col-md-2 text-end">
    <button (click)="closeDialog()" class="btn btn-lims-danger btn-sm"><mat-icon aria-hidden="false" aria-label="edit" fontIcon="close"></mat-icon></button>
  </div>
  <hr />

  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <p>{{data.remarks || ''}}</p>
      </div>

      <div class="col-md-12 text-end mt-4">
        <button (click)="closeDialog()" class="btn btn-danger btn-sm">

          Close
        </button>
      </div>
</div>
  </div>
</div>

  `
})
export class ViewReportRemarksComponent implements OnInit {
  isLoading = false;
  constructor(
    private dialogRef: MatDialogRef<ViewReportRemarksComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    ) { 
      // console.log(data, 'po')
    }

  ngOnInit(): void { }

  closeDialog() {
    this.dialogRef.close();
  }
}
