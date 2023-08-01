import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestRequestDetailsService } from 'src/app/services/analyst/test-request-details/test-request-details.service';
import { collectionInOut } from 'src/app/shared/animations/animations';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
  animations: [collectionInOut]
})
export class CalculateComponent implements OnInit {

  calculateForm: FormGroup;
  formControls: any[] = [];

  isControlGenerated: boolean = false;
  isLoading: boolean = false;
  isCalculating: boolean = false;

  notations = 'a= Test Variable a, b=Test Variable b, c=Test Variable c';

  requestDetails = null;

  responseError = null;

  isGenerating = false;

  finalResult = 0;
  formulaField = ''

  analyst_remarks = '';

  microParametersDetails: any;

  convertedResult;

  constructor(
    private fb: FormBuilder,
    private service: TestRequestDetailsService,
    private dialogRef: MatDialogRef<CalculateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService
    ) {}

   splitStringByComma(input: string): string[] {
      const result: string[] = input?.split(',');
      return result;
    }

    getMicroParameterDetails() {
      let payload;
      if(this.data.is_existing) {
      payload = {
        id: this.data?.micro_table
      }
    }else {
      payload = {
        id: this.data.parameters.micro_table
      }
    }
      // let id = this.data.selectedParameter.micro_table
      this.service.getMicroParameterDetails(payload).subscribe(res => {
        this.microParametersDetails = res;
      })
    }

  ngOnInit(): void {
    if(this.data) {
    this.getFormParameters();
    }
    setTimeout(() => {
      this.generateForm();
    }, 1500);

    if(this.data?.type === 'micro') {
      this.getMicroParameterDetails();
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

  resetForm() {
    this.calculateForm.reset();
  }

  convertDecimal(decimals) {
    const x = Math.pow(10, Number(decimals) + 2);
    this.convertedResult =  (Number(this.finalResult) + (1 / x)).toFixed(decimals)
}

  generate() {
    this.isGenerating = true;
    let requestPayload;
    if(this.data.type === 'micro') {
      requestPayload ={
        formula_variable_fields_value: JSON.stringify(this.calculateForm.value),
        sample_form: this.data.details.id,
        commodity: this.data.details.commodity.id,
        parameter: this.data?.parameters?.id
      }
    } else {
      requestPayload ={
        formula_variable_fields_value: JSON.stringify(this.calculateForm.value),
        sample_form: this.data.details.sample_form.id,
        commodity: this.data.details.sample_form.commodity.id,
        parameter: this.data?.parameters?.id
      }
    }
    
    this.service.calculateResult(requestPayload).subscribe(res => {
      this.isGenerating = false;
      this.toast.showToast(TOAST_STATE.success, res.message);
      this.dismissMessage();
      this.finalResult = res.result;

      const x = Math.pow(10, Number(2) + 2);
    this.convertedResult =  (Number(this.finalResult) + (1 / x)).toFixed(2)

      
      this.formulaField = res.formula_variable_fields_value;
    },(error) => {
      this.responseError = error?.error;
      this.isGenerating = false;
    })
  }

  submit() {
    this.isCalculating = true;
    let requestPayload = {
      formula_variable_fields_value: this.formulaField,
      sample_form: this.data.details.sample_form.id,
      commodity: this.data.details.sample_form.commodity.id,
      parameter: this.data?.parameters?.id
    }
    this.service.calculateResult(requestPayload).subscribe(res => {
      this.isCalculating = false;
      this.dialogRef.close();
      this.toast.showToast(TOAST_STATE.success, res.message);
      this.dismissMessage();
    },
    (error) => {
      this.isCalculating = false;
      this.responseError= error?.error
      this.isCalculating = false;

    })
  }

  dismissMessage() {
    setTimeout(() => {
      this.toast.dismissToast()
    }, 2500);
  }

  convertToString(data) {
    return data.toString
  }

  getFormParameters() {
    // console.log(this.data, "TOTAL FOA")
    this.isLoading = true;
    let payload;
    if(this.data.type !== 'micro') {
    payload = {
      commodity_id: this.data?.details?.sample_form?.commodity?.id,
      parameter_id: this.data.parameters.id,
      sample_form_id: this.data?.details?.sample_form?.id
    }} else {
      payload = {
        commodity_id: this.data?.details?.commodity?.id,
        parameter_id: this.data.parameters.id,
        sample_form_id: this.data?.details?.id
      }
    }

    this.service.getFormParameters(payload).subscribe(res => {
      this.formControls = res.fields;
      this.isLoading = false;
    })
  }

  generateForm() {
    // Initialize the form using FormBuilder dynamically
    const formGroupConfig = {
    }

    // Iterate through the form controls JSON and create corresponding form controls
    this.formControls.forEach(control => {
      if(control) {
      formGroupConfig[control.name] = new FormControl(control.value);
      }
    });

    this.calculateForm = this.fb.group(formGroupConfig);
    this.isControlGenerated = true;
  }

  setResult() {
    this.isCalculating = true;
    let payload
    if(this.data.type === 'micro') {
      payload = {
        sample_form: this.data?.details?.id,
        result: this.finalResult,
        parameter: this.data.parameter,
        commodity: this.data.commodity.id,
        formula_variable_fields_value:JSON.stringify(this.calculateForm.value),
        sample_form_has_parameter: this.data?.id,
        analyst_remarks:this.analyst_remarks,
        converted_result:this.convertedResult,
        decimal_place: 2,
        units:this.data?.parameters?.insUnits,
        test_method: this.data?.parameters?.insTestMethod,
        mandatory_standard: this.data?.parameters?.insMandatoryStandards
      }
    } else {
    payload = {
      sample_form: this.data?.details?.sample_form?.id,
      result: this.finalResult,
      parameter: this.data.parameter,
      commodity: this.data.commodity.id,
      formula_variable_fields_value:JSON.stringify(this.calculateForm.value),
      sample_form_has_parameter: this.data.details?.id,
      analyst_remarks:this.analyst_remarks,
      converted_result:this.convertedResult,
      decimal_place: 2,
      units:this.data?.parameters?.insUnits,
      test_method: this.data?.parameters?.insTestMethod,
      mandatory_standard: this.data?.parameters?.insMandatoryStandards
    }
  }

    this.service.setResult(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, res.message);
      this.dismissMessage();
      this.isCalculating = false;
      this.dialogRef.close();
    },(error) => {
      this.responseError = error?.error;
      this.isCalculating = false;
    })
  }
}
