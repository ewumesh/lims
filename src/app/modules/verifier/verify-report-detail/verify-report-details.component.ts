import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VerifyReportDetailsService } from 'src/app/services/verifier/verify-report-details/verify-report-details.service';

@Component({
  templateUrl: './verify-report-details.component.html',
  styleUrls: ['./verify-report-details.scss']
})
export class VerifyReportDetailsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: VerifyReportDetailsService
    ) { }

  ngOnInit(): void { }
}
