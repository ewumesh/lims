import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
    templateUrl:'./micro-parameter-details.html',
    styleUrls:['./micro-parameter.scss']
})

export class MicroParameterDetailsComponent implements OnInit{

    parameterDetailsForm: FormGroup;

    constructor(private fb: FormBuilder){}

    initForm() {
        this.parameterDetailsForm = this.fb.group({
            physical_condition_of_sample: '',
            media_used: '',
            prepared_dilution:'',
            diluent_used:'',
            positive_control_used:'',
            negative_control_used:'',
            date_and_time:'',
            required_temprature:''
        })
    }

    ngOnInit(): void {
        this.initForm();
    }

    closeDialog() {
        
    }
}