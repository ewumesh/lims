import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminLabReportService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  getSampleReportDetails(payload): Observable<any> {
    return this.http.get(`${this.url}/api/report/final-report-sample-form/?search=${payload.search}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}&status=${payload.status}&client_category_detail__client_category=${payload.client_category}`)
    // return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users?search=${payload.serarch}&limit=${payload.size}&offset=${payload.page}&from=${payload.from}&to=${payload.to}`)
  }

  getStatusList(payload?):Observable<any> {
    return this.http.get(`${this.url}/api/report/status/lab-report/`)
  }

  getClientCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }
}
