import { NgModule } from "@angular/core";
import { ComplainComponent } from "./complain.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [ComplainComponent],
    imports: [
        CommonModule,

        RouterModule.forChild([
            {path: '', component: ComplainComponent}
        ])
    ],
    exports: [],
    providers: []
})

export class ComplainModule {

}