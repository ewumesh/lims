

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SupervisorReportService {
  url = environment.apiURL;

  constructor(private http: HttpClient){}

  getSampleReport(payload):Observable<any> {

    return this.http.get(`${this.url}/api/report/sample-form-has-assigned-analyst-final-report`, payload)
  }
}
