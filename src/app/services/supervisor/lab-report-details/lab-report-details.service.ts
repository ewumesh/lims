import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LabReportDetailsService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAssignedSamples(payload):Observable<any> {
    return this.http.get(`${this.url}/api/report/sample-form-has-parameter-has-assigned-analyst/${payload.sampleId}/`)
  }

  getSampleDetails(id):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/${id}`)
  }
}
