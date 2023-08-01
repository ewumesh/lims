import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl:'./view-multiple-details.html',
    styles:[`
    mat-list-item:hover {
        background-color:#eee !important;
        cursor:pointer !important;
    }
    `]
})

export class ViewmultipleDetailsComponent {

    folders: any[] = [
        {
          name: 'Photos',
          updated: new Date('1/1/16'),
        },
        {
          name: 'Recipes',
          updated: new Date('1/17/16'),
        },
        {
          name: 'Work',
          updated: new Date('1/28/16'),
        },
      ];
      notes: any[] = [
        {
          name: 'Vacation Itinerary',
          updated: new Date('2/20/16'),
        },
        {
          name: 'Kitchen Remodel',
          updated: new Date('1/18/16'),
        },
      ];

    constructor(
        private dialogRef:MatDialogRef<ViewmultipleDetailsComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        ) {}


    closeDialog() {
        this.dialogRef.close();
    }
}