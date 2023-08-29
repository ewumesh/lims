import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { UserActivationComponent } from "./user-activation.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[UserActivationComponent],
    imports:[CommonModule, MatDialogModule, MatTooltipModule,MatToolbarModule,MatSlideToggleModule, FormsModule],
    exports:[UserActivationComponent]
})

export class UserActivationModule {
    
}