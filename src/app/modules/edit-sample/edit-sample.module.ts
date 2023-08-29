import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatTableModule } from "@angular/material/table";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { EditSampleService } from "src/app/services/edit-sample/service";
import { RouterModule } from "@angular/router";

import { EditSampleComponent } from "./edit-sample.component.";

@NgModule({
    declarations: [EditSampleComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: EditSampleComponent}
          ]),
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatTableModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [EditSampleService]
})

export class EditSampleModule {

}