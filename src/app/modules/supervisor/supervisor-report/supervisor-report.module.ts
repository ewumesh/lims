import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupervisorReportComponent } from './supervisor-report';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SupervisorReportService } from 'src/app/services/supervisor/supervisor-report/service';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    imports:[
        CommonModule,

        RouterModule.forChild([
            {path: '', component: SupervisorReportComponent}
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,

        AvatarModule,
        SharedModule
    ],
    exports:[],
    providers:[SupervisorReportService],
    declarations: [SupervisorReportComponent]
})

export class SupervisorReportModule {

}