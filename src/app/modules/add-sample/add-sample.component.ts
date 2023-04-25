import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

// Custom component(s)
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { rowsAnimation } from 'src/app/shared/animations/animations';

@Component({
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.scss'],
  animations:[rowsAnimation]
})
export class AddSampleFormComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>();

  addSampleForm: FormGroup;
  isLoading: boolean;
  message: any;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private title: Title,
  ) {
    this.title.setTitle('Add Sample - Laboratory Inventory Management System');

    this.genericValidator = new GenericValidator({
      'sampleName': {
        'required': 'Sample Name is required.'
      },
      'sampleCondition': {
        'required': 'Sample Condition is required.'
      },
      'mfd': {
        'required': 'Manufactured is required.'
      },
      'bbd': {
        'required': 'Best before date is required.'
      },
      'batchOrLotNumber': {
        'required': 'Batch/Lot No is required.'
      },
      'brandName': {
        'required': 'Brand Name is required.'
      },
      'proposeOfAnalysis': {
        'required': 'Purpose of Analysis is required.'
      },
      'reportRequiredByDate': {
        'required': 'Report Required by Date is required.'
      },
      'commodityForAnalysis': {
        'required': 'Commodity for Analysis is required.'
      },
      'reportingLanguage': {
        'required': 'Reporting Language is required.'
      },

    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.addSampleForm = this.fb.group({
      sampleName: ['', Validators.required],
      sampleCondition: ['', Validators.required],
      mfd: ['', Validators.required],
      bbd: ['', Validators.required],
      batchOrLotNumber: ['', Validators.required],
      brandName: ['', Validators.required],
      proposeOfAnalysis: ['', Validators.required],
      reportRequiredByDate: ['', Validators.required],
      amendmentsToReport: [''],
      note: [''],
      commodityForAnalysis: ['', Validators.required],
      reportingLanguage: ['', Validators.required],
      parametersForAnalysis: ['']
    })
  }

  saveChanges() {
    if (this.addSampleForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }

    this.isLoading = true;

  }

  ngAfterViewInit(): void {
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.addSampleForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
