import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TestRequestDetailsService } from "src/app/services/analyst/test-request-details/test-request-details.service";
import { TOAST_STATE, ToastService } from "src/app/shared/toastr/toastr.service";


@Component({
    templateUrl: './micro-parameter-details.html',
    styleUrls: ['./micro-parameter.scss']
})

export class MicroParameterDetailsComponent implements OnInit {

    parameterDetailsForm: FormGroup;

    observationForm: FormGroup;

    addedParameterDetails: any;

    isSetParameterDetails: boolean = false;
    responseError = null;
    message: any = {};

    existingParameterDetails: any;

    microId: number;

    public listColors = ['primary', 'accent', 'warn'];

    public stepHours = [1, 2, 3, 4, 5];
    public stepMinutes = [1, 5, 10, 15, 20, 25];
    public stepSeconds = [1, 5, 10, 15, 20, 25];

    constructor(
        private fb: FormBuilder,
        private service: TestRequestDetailsService,
        private toast: ToastService,
        private dialogRef: MatDialogRef<MicroParameterDetailsComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,) {
        // console.log(data, 'MY OB DATAE') 
    }


    getExistingParameter() {
        let payload = {
            id: this.data.selectedParameter?.micro_table
        }
        this.service.getMicroParameterDetails(payload).subscribe(res => {
            this.existingParameterDetails = res;
            this.parameterDetailsForm.patchValue(res);
            this.addedParameterDetails = res;



            // this.observationForm.value.observation = res.micro_observation_table;

            // console.log(this.observationForm.value, "AFTER PATCHED..")
            let observation = this.existingParameterDetails.micro_observation_table;
            // this.addObservation();
            // this.observationForm.value.observation = observation;    
            if (observation.length > 0) {
                for (let j = 0; j < observation.length; j++) {
                    let firstColumn = this.fb.group({
                        id: observation[j]?.id,

                        observation_number: observation[j]?.observation_number,
                        observation_time: observation[j]?.observation_time,
                        temperature: observation[j]?.temperature,
                        time: observation[j]?.time,
                        first_exponent: this.existingParameterDetails?.first_exponent,
                        first_exponent_a: observation[j]?.first_exponent_a,
                        first_exponent_b: observation[j]?.first_exponent_b,
                        second_exponent: this.existingParameterDetails?.second_exponent,
                        second_exponent_a: observation[j]?.second_exponent_a,
                        second_exponent_b: observation[j]?.second_exponent_b,
                        third_exponent: this.existingParameterDetails?.third_exponent,
                        third_exponent_a: observation[j]?.third_exponent_a,
                        third_exponent_b: observation[j]?.third_exponent_b,
                        negative_control: observation[j]?.negative_control,
                        positive_control: observation[j]?.positive_control,
                        micro_parameter_table: observation[j]?.micro_parameter_table,
                        parameter: observation[j]?.parameter,
                        sample_form: observation[j]?.sample_form
                    })

                    this.form.push(firstColumn);

                    // }
                }
            } else {
                this.addObservation();
            }

            console.log(this.form.value, 'hjagsbd ok kok okok')
        })
    }

    initForm() {
        console.log(this.data, 'INIT FORM')
        this.parameterDetailsForm = this.fb.group({
            id: null,
            physical_condition_of_sample: '',
            media_used: '',
            prepared_dilution: '',
            diluent_used: '',
            positive_control_used: '',
            negative_control_used: '',
            date_of_incubation: '',
            required_temperature: '',
            sample_form: this.data?.sample_form,
            parameter: this.data?.selectedParameter?.id,
            sample_form_has_parameter: this.data?.id,
            first_exponent: '',
            second_exponent: '',
            third_exponent: ''
        })

        if (this.data?.selectedParameter?.micro_table && this.data?.selectedParameter?.micro_table !== null) {
            this.getExistingParameter();
        }
    }

    initObservationForm() {
        this.observationForm = this.fb.group({
            observation: new FormArray([])
        })
    }

    createObservationForm() {
        return this.fb.group({
            observation_number: '',
            observation_time: '',
            temperature: '',
            time: '',
            first_exponent: '',
            first_exponent_a: '',
            first_exponent_b: '',
            second_exponent: '',
            second_exponent_a: '',
            second_exponent_b: '',
            third_exponent: '',
            third_exponent_a: '',
            third_exponent_b: '',
            negative_control: '',
            positive_control: '',
            micro_parameter_table: '',
            parameter: '',
            sample_form: ''
        })
    }

    addObservation() {
        console.log(this.addedParameterDetails, 'PRAM DEWW')
        // this.form.clear();
        // this.form = new Form
        this.observationForm.setControl('observation', new FormArray([]));
        for (let a = 1; a <= 5; a++) {
            if (a === 1) {
                let firstColumn = this.fb.group({
                    observation_number: '1 (24hrs)',
                    observation_time: '',
                    temperature: this.addedParameterDetails?.required_temperature,
                    time: this.addedParameterDetails?.date_of_incubation,
                    first_exponent: this.addedParameterDetails?.first_exponent,
                    first_exponent_a: '',
                    first_exponent_b: '',
                    second_exponent: this.addedParameterDetails?.second_exponent,
                    second_exponent_a: '',
                    second_exponent_b: '',
                    third_exponent: this.addedParameterDetails?.third_exponent,
                    third_exponent_a: '',
                    third_exponent_b: '',
                    negative_control: '',
                    positive_control: '',
                    micro_parameter_table: this.addedParameterDetails?.id,
                    parameter: this.data?.selectedParameter?.id,
                    sample_form: this.data?.sample_form
                })

                this.form.push(firstColumn);
            } else if (a == 2) {
                let secondColumn = this.fb.group({
                    observation_number: '2 (48hrs)',
                    observation_time: '',
                    temperature: this.addedParameterDetails?.required_temperature,
                    time: this.addedParameterDetails?.date_of_incubation,
                    first_exponent: this.addedParameterDetails?.first_exponent,
                    first_exponent_a: '',
                    first_exponent_b: '',
                    second_exponent: this.addedParameterDetails?.second_exponent,
                    second_exponent_a: '',
                    second_exponent_b: '',
                    third_exponent: this.addedParameterDetails?.third_exponent,
                    third_exponent_a: '',
                    third_exponent_b: '',
                    negative_control: '',
                    positive_control: '',
                    micro_parameter_table: this.addedParameterDetails?.id,
                    parameter: this.data.selectedParameter?.id,
                    sample_form: this.data?.sample_form
                })
                this.form.push(secondColumn);
            } else if (a == 3) {
                let thirdColumn = this.fb.group({
                    observation_number: '3 (72hrs)',
                    observation_time: '',
                    temperature: this.addedParameterDetails?.required_temperature,
                    time: this.addedParameterDetails?.date_of_incubation,
                    first_exponent: this.addedParameterDetails?.first_exponent,
                    first_exponent_a: '',
                    first_exponent_b: '',
                    second_exponent: this.addedParameterDetails?.second_exponent,
                    second_exponent_a: '',
                    second_exponent_b: '',
                    third_exponent: this.addedParameterDetails?.third_exponent,
                    third_exponent_a: '',
                    third_exponent_b: '',
                    negative_control: '',
                    positive_control: '',
                    micro_parameter_table: this.addedParameterDetails?.id,
                    parameter: this.data?.selectedParameter?.id,
                    sample_form: this.data?.sample_form
                })
                this.form.push(thirdColumn);
            } else if (a == 4) {
                let fourthColumn = this.fb.group({
                    observation_number: '4 (96hrs)',
                    observation_time: '',
                    temperature: this.addedParameterDetails?.required_temperature,
                    time: this.addedParameterDetails?.date_of_incubation,
                    first_exponent: this.addedParameterDetails?.first_exponent,
                    first_exponent_a: '',
                    first_exponent_b: '',
                    second_exponent: this.addedParameterDetails?.second_exponent,
                    second_exponent_a: '',
                    second_exponent_b: '',
                    third_exponent: this.addedParameterDetails?.third_exponent,
                    third_exponent_a: '',
                    third_exponent_b: '',
                    negative_control: '',
                    positive_control: '',
                    micro_parameter_table: this.addedParameterDetails?.id,
                    parameter: this.data?.selectedParameter?.id,
                    sample_form: this.data?.sample_form
                })
                this.form.push(fourthColumn);
            } else if (a == 5) {
                let fifthColumn = this.fb.group({
                    observation_number: '5 (120hrs)',
                    observation_time: '',
                    temperature: this.addedParameterDetails?.required_temperature,
                    time: this.addedParameterDetails?.date_of_incubation,
                    first_exponent: this.addedParameterDetails?.first_exponent,
                    first_exponent_a: '',
                    first_exponent_b: '',
                    second_exponent: this.addedParameterDetails?.second_exponent,
                    second_exponent_a: '',
                    second_exponent_b: '',
                    third_exponent: this.addedParameterDetails?.third_exponent,
                    third_exponent_a: '',
                    third_exponent_b: '',
                    negative_control: '',
                    positive_control: '',
                    micro_parameter_table: this.addedParameterDetails?.id,
                    parameter: this.data.selectedParameter?.id,
                    sample_form: this.data?.sample_form

                })

                this.form.push(fifthColumn);
            }
        }
    }

    get form(): FormArray {
        return this.observationForm.get('observation') as FormArray;
    }

    ngOnInit(): void {
        this.initForm();
        this.initObservationForm();
        // this.addObservation();

        // console.log(this.observationForm.value);
    }

    closeDialog() {
        this.dialogRef.close();
    }

    calculate() {
        // console.log(this.observationForm.value, "ok observation ...");
    }

    setMicroParameter() {
        this.isSetParameterDetails = true;
        this.service.setMicorParameters(this.parameterDetailsForm.value).subscribe(res => {
            this.addedParameterDetails = res.data;
            this.toast.showToast(TOAST_STATE.success, res.message);
            this.dissmissToast();
            this.addObservation();
            this.microId = res.data.id
            // if(this.existingParameterDetails?.micro_observation_table) {
            //     let observation = this.existingParameterDetails.micro_observation_table;
            //     // this.addObservation();
            //     this.observationForm.patchValue(observation);
            // }
            this.isSetParameterDetails = false;
        }, (error) => {
            window.scroll(0, 0);
            this.responseError = error?.error;
            this.isSetParameterDetails = false;
        })
    }

    updateMicroParameter() {
        this.isSetParameterDetails = true;
        this.service.updateMicorParameters(this.parameterDetailsForm.value).subscribe(res => {
            this.addedParameterDetails = res.data;
            console.log(res.data, 'OIKJMIUJKM')
            this.toast.showToast(TOAST_STATE.success, res.message);
            this.dissmissToast();
            this.addObservation();
            this.microId = res.data.id
            this.isSetParameterDetails = false;
        }, (error) => {
            window.scroll(0, 0);
            this.responseError = error?.error;
            this.isSetParameterDetails = false;
        })
    }

    saveObservationTable() {
        this.service.saveObservationTable(this.observationForm.value.observation).subscribe(res => {
            this.toast.showToast(TOAST_STATE.success, res.message);
            this.dissmissToast();
            let closingPayload = {
                status: true,
                id: this.microId
            }
            this.dialogRef.close(closingPayload);
        }, (error) => {
            window.scroll(0, 0);
            this.responseError = error?.error;
        })
    }

    updateObservationTable() {

        // console.log(this.existingParameterDetails.micro_observation_table, "MY DATA FOR OBSERVATION")
        if (this.existingParameterDetails.micro_observation_table.length > 0) {
            let payload = this.parameterDetailsForm.value;
            let observationWithId = [];
            let existingObservation = this.existingParameterDetails.micro_observation_table
            let observation = this.observationForm.value.observation;
            observation.forEach((element, index) => {
               let o = element.id = existingObservation[index].id;
               observationWithId.push(o);
            });

            

            console.log(observationWithId, 'PAYLOAD >>>>>')
            this.service.updateObservationTable(payload, this.observationForm.value.observation).subscribe(res => {
                this.toast.showToast(TOAST_STATE.success, res.message);
                this.dissmissToast();
                let closingPayload = {
                    status: true,
                    id: this.microId
                }
                this.dialogRef.close(closingPayload);
            }, (error) => {
                window.scroll(0, 0);
                this.responseError = error?.error;
            })
        } else {
            this.service.saveObservationTable(this.observationForm.value.observation).subscribe(res => {
                this.toast.showToast(TOAST_STATE.success, res.message);
                this.dissmissToast();
                this.dialogRef.close(true);
            }, (error) => {
                window.scroll(0, 0);
                this.responseError = error?.error;
            })
        }
    }

    dissmissToast() {
        setTimeout(() => {
            this.toast.dismissToast();
        }, 1200);

    }
}