import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './view-report.html',
  styleUrls: ['./view-report.scss']
})
export class ViewReportComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<ViewReportComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService
  ) { }

  ngOnInit(): void { }

  closeDialog() {
    this.dialogRef.close();
  }
}
