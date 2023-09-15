import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TestRequestService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  getTestRequests(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users/?form_available=analyst&analyst_user=${payload.user}&search=${payload.search}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}&status=${payload.status}&limit=${payload.size}`);
  }


  getAllCommodities(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`);
  }

  getStatusList(payload?):Observable<any> {
    return this.http.get(`${this.url}/api/report/status/assigned-sample/`)
  }
}
