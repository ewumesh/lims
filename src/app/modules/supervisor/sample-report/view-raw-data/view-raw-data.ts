import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl: './view-raw-data.html',
    styleUrls: ['./view-raw-data.scss']
})

export class SupervisorViewRawDataComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<SupervisorViewRawDataComponent>
    ) { }

    ngOnInit(): void {
        
    }

}