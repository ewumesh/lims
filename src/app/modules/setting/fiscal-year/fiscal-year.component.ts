import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FiscalYearService } from "src/app/services/settings/fiscal-year/fiscal-year.service";
import { collectionInOut } from "src/app/shared/animations/animations";
import { TOAST_STATE, ToastService } from "src/app/shared/toastr/toastr.service";


@Component({
    templateUrl: './fiscal-year.component.html',
    styleUrls: ['./fiscal-year.component.scss'],
    animations:[collectionInOut]
})

export class FiscalYearComponent implements OnInit {

    displayedColumns: string[] = ['sn', 'name', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    isLoading = false;

    fiscalYear: any[] = [];

    isEdit  = false;
    fiscal_year = '';

    constructor(
        private service: FiscalYearService,
        private toast: ToastService
        ) { }

    ngOnInit(): void {
        this.getFiscalYear();
        let payload = {
            fiscal_year:'2080/81'
        }
    }

    getFiscalYear() {
        this.isLoading = true;
        this.service.getFiscalYear().subscribe(res => {
            this.dataSource.data = res;
            this.isLoading = false;
        })
    }

    edit(el) {
        this.fiscal_year = el.fiscal_year;
        this.isEdit = true;
    }

    save(id) {
        let payload = {
            id: id,
            fiscal_year:this.fiscal_year
        }
        this.service.updateFiscalYear(payload).subscribe(res => {
            this.toast.showToast(TOAST_STATE.success, 'Fiscal year updated successfully');
            this.dismissMessage();
            this.getFiscalYear();
            this.isEdit = false;
        })
    }

    dismissMessage() {
        setTimeout(() => {
            this.toast.dismissToast();
        }, 2000)
    }

}