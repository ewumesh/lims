
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminSampleRequestService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getSmaples(payload): Observable<any> {
    return this.http.get(`${this.url}/api/report/sample-form-to-approved-by-admin/?search=${payload.search}&status=${payload.status}`)
  }

  getStatusList(payload?):Observable<any> {
    return this.http.get(`${this.url}/api/report/status/sample-verify/`)
  }

  verifySample(payload):Observable<any> {
    return this.http.patch(`${this.url}/api/sample-form/${payload.id}/`, payload)
  }
}
