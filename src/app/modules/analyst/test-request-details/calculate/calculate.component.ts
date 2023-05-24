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

  constructor(
    private fb: FormBuilder,
    private service: TestRequestDetailsService,
    private dialogRef: MatDialogRef<CalculateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService
    ) {
      this.requestDetails = this.data;
    }

   splitStringByComma(input: string): string[] {
      const result: string[] = input?.split(',');
      return result;
    }

  ngOnInit(): void {
    this.getFormParameters();
    setTimeout(() => {
      this.generateForm();
    }, 1500);

  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    this.isCalculating = true;
    let requestPayload = {
      formula_variable_fields_value: JSON.stringify(this.calculateForm.value),
      sample_form: this.data.details.sample_form.id,
      commodity: this.data.details.sample_form.commodity_id,
      parameter: this.data?.parameters?.id
    }
    this.service.calculateResult(requestPayload).subscribe(res => {
      this.isCalculating = false;
      this.dialogRef.close();
    },
    (error) => {
      this.isCalculating = false;
      if (error.status === 400) {
        this.toast.showToast(
          TOAST_STATE.danger,
          'All the field(s) are not valid.');

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);
      }else if(error.status === 500 || error.status > 500 ) {

        this.toast.showToast(
          TOAST_STATE.danger,
          'Internal Server Error');

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);


      } else {
        this.toast.showToast(
          TOAST_STATE.danger,
          error?.error?.error);

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);
      }
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
      commodity_id: this.data?.details?.sample_form?.commodity_id,
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
}
