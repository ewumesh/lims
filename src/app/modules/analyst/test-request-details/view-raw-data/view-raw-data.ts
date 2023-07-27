import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './view-raw-data.html',
  styleUrls: ['./view-raw-data.scss']
})
export class ViewRawDataComponent implements OnInit {
  rawDatasheetDetails: any;

  constructor(
    private dialogRef: MatDialogRef<ViewRawDataComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    ) { }

  ngOnInit(): void {
    // console.log(this.data, 'aa')
    this.rawDatasheetDetails  = this.data.data;
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
