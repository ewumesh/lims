import { Component,Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";



@Component({
    template:`
    <img height="100%" width="100%" [src]="data" />
    `
})

export class ViewPaymentReceiptComponent {
    constructor(@Inject(MAT_DIALOG_DATA)
    public data: any,) {

    }
}