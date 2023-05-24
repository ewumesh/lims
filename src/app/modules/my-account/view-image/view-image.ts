import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './view-image.html'
})
export class ViewImageComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ViewImageComponent>,
    @Inject(MAT_DIALOG_DATA)
    public url: any,) { }

  ngOnInit(): void { }
}
