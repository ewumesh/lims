import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestRequestDetailsService } from 'src/app/services/analyst/test-request-details/test-request-details.service';
import { collectionInOut } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
  animations: [collectionInOut]
})
export class CalculateComponent implements OnInit {

  calculateForm: FormGroup;
  formControls: any[] = [];

  isControlGenerated: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: TestRequestDetailsService,
    private dialogRef: MatDialogRef<CalculateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    ) { }

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
    console.log(this.calculateForm.value, "form Value")

    let formData = this.calculateForm.value;

    formData.sample_form = this.data.details.sample_form.id;
    formData.commodity = this.data.details.sample_form.commodity_id;
    formData.parameter = this.data?.parameters?.id;

    console.log(formData, 'final form data')

    this.service.calculateResult(formData).subscribe(res => {

    })
  }

  getFormParameters() {
    let payload = {
      commodity_id: this.data?.details?.sample_form?.commodity_id,
      parameter_id: this.data.parameters.id,
      sample_form_id: this.data?.details?.sample_form?.id
    };

    this.service.getFormParameters(payload).subscribe(res => {
      this.formControls = res.fields;
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
