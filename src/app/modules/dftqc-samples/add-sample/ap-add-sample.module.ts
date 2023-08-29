import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";

// Custom Components
import { ApAddSampleComponent } from "./ap-add-sample.component";
import { LicensingAddSampleService } from "src/app/services/dftqc/service";
import { MatTableModule } from "@angular/material/table";
import { MatRadioModule } from "@angular/material/radio";


@NgModule({
    declarations: [
        ApAddSampleComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMatSelectSearchModule,
        MatRadioModule,
        RouterModule.forChild([
            { path: '', component: ApAddSampleComponent }
        ]),
        MatTableModule
    ],
    exports: [],
    providers: [LicensingAddSampleService]
})

export class ApAddSampleModule {

}