import { NgModule } from "@angular/core";
import { ComplainComponent } from "./complain.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";


@NgModule({
    declarations: [ComplainComponent],
    imports: [
        CommonModule,

        RouterModule.forChild([
            {path: '', component: ComplainComponent}
        ]),
        MatMenuModule
    ],
    exports: [],
    providers: []
})

export class ComplainModule {

}