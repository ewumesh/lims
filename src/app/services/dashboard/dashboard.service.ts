import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DashboarService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getDashboardStatus(): Observable<any> {
    return this.http.get(`${this.url}/api/report/dashboard-report`)
  }

  getMySamples(payload): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/?search=${payload.search}&owner_user=${payload.user}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}`);
  }

  getCompletedSample(payload): Observable<any> {
    return this.http.get(`${this.url}/api/report/final-report-sample-form/?search=${payload.search}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}`)
  }

  downloadReport(payload) :Observable<any> {
    let url = `${this.url}/api/report/get-single-report/${payload.report_name}/${payload.report_type}/${payload.report_lang}/${payload.id}/5/`;
    setTimeout(() => {
      window.location.href = url;
    }, 500);

    return this.http.get(url)
  }

  getTestRequests(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users/?form_available=analyst&analyst_user=${payload.user}&search=${payload.search}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}&status=${payload.status}`);
  }
}
