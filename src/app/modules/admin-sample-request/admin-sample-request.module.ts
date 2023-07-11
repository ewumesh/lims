import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminSampleRequestComponent } from "./admin-sample-request.component";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { AdminSampleRequestService } from "src/app/services/admin-sample-request.service.ts/service";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
    imports:[
        CommonModule,

        RouterModule.forChild([
        {
            path: '',
            component: AdminSampleRequestComponent
        }
        ]),

        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatIconModule
    ],
    exports:[],
    declarations: [AdminSampleRequestComponent],

    providers: [AdminSampleRequestService]
})

export class AdminSampleRequestModule {}