import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { DeleteConfirmModule } from "src/app/shared/delete-confirm/delete-confirm.module";
import { EditParameterCompopnent } from "./edit-parameter.component";


@NgModule({
    declarations:[EditParameterCompopnent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: EditParameterCompopnent }
        ]),

        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatExpansionModule,
        MatDialogModule,
        MatListModule,

        DeleteConfirmModule
    ]
})

export class EditParameterModule {
    
}