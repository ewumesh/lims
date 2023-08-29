import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";

import { FiscalYearService } from "src/app/services/settings/fiscal-year/fiscal-year.service";
import { FiscalYearComponent } from "./fiscal-year.component";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    declarations:[FiscalYearComponent],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatIconModule,
        RouterModule.forChild([
            {path:'', component: FiscalYearComponent}
        ])
    ],
    providers:[FiscalYearService]
})

export class FiscalYearModule {

}