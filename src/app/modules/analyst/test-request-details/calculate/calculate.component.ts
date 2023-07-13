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

  constructor(
    private fb: FormBuilder,
    private service: TestRequestDetailsService,
    private dialogRef: MatDialogRef<CalculateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService
    ) {
      this.requestDetails = this.data;
      console.log('MY DATA', data)
    }

   splitStringByComma(input: string): string[] {
      const result: string[] = input?.split(',');
      return result;
    }

    getMicroParameterDetails() {
      console.log(this.data.selectedParameter.micro_table, "MY PARAMETER...")
      let payload = {
        id: this.data.selectedParameter.micro_table
      }
      // let id = this.data.selectedParameter.micro_table
      this.service.getMicroParameterDetails(payload).subscribe(res => {
        this.microParametersDetails = res;
      })
    }

  ngOnInit(): void {
    this.getFormParameters();
    setTimeout(() => {
      this.generateForm();
    }, 1500);

    if(this.data?.selectedParameter?.micro_table) {
      this.getMicroParameterDetails();
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

  resetForm() {
    this.calculateForm.reset();
  }

  generate() {
    this.isGenerating = true;
    let requestPayload = {
      formula_variable_fields_value: JSON.stringify(this.calculateForm.value),
      sample_form: this.data.details.sample_form.id,
      commodity: this.data.details.sample_form.commodity.id,
      parameter: this.data?.parameters?.id
    }
    this.service.calculateResult(requestPayload).subscribe(res => {
      this.isGenerating = false;
      this.toast.showToast(TOAST_STATE.success, res.message);
      this.dismissMessage();
      this.finalResult = res.result;
      this.formulaField = res.formula_variable_fields_value;
      console.log(res, 'res');
    },(error) => {
      this.responseError = error?.error;
      this.isGenerating = false;
    })
  }

  submit() {
    console.log(this.data, "OK..")
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
    this.isLoading = true;
    let payload = {
      commodity_id: this.data?.details?.sample_form?.commodity?.id,
      parameter_id: this.data.parameters.id,
      sample_form_id: this.data?.details?.sample_form?.id
    };

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
    let payload = {
      sample_form: this.data?.details?.sample_form?.id,
      result: this.finalResult,
      parameter: this.data.parameter,
      commodity: this.data.commodity.id,
      formula_variable_fields_value:JSON.stringify(this.calculateForm.value),
      sample_form_has_parameter: this.data.details?.id,
      analyst_remarks:this.analyst_remarks,
      converted_result:this.finalResult,
      decimal_place: 2
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
