import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LabReportService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}
}
