import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminSampleRequestDetailComponent } from "./admin-sample-request-details.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminSampleRequestDetailsService } from "src/app/services/admin-sample-request-details/service";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { ApproveFinalSampleComponent } from "./approve/approve-final-sample.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AdminReportComponent } from "./view-sample/admin-view-sample";

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminSampleRequestDetailComponent}]),
        MatIconModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule
    ],
    declarations:[AdminSampleRequestDetailComponent,ApproveFinalSampleComponent,AdminReportComponent],
    exports:[],
    providers:[AdminSampleRequestDetailsService]
})

export class AdminSampleRequestDetailModule {

}