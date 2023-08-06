import { Component,Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";



@Component({
    template:`
    <img [src]="data" />
    `
})

export class ViewReportDoc {
    constructor(@Inject(MAT_DIALOG_DATA)
    public data: any,) {

    }
}