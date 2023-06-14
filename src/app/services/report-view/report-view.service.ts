import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportViewService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getMySamples(payload): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/?search=${payload.search}&owner_user=${payload.user}?created_date__date__gte=${payload.from}?created_date__date__lte=${payload.to}?status=${payload.status}`);
  }

  getSampleReportDetails(payload): Observable<any> {
    return this.http.get(`${this.url}/api/report/final-report-sample-form/?search=${payload.search}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}`)
    // return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users?search=${payload.serarch}&limit=${payload.size}&offset=${payload.page}&from=${payload.from}&to=${payload.to}`)
  }
}
