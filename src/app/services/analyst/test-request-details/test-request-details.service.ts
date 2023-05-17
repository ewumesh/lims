import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TestRequestDetailsService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getTestRequestDetails(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users/${payload.id}?form_available=analyst&analyst_user=${payload.user}`);
  }


  getAllCommodities(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`);
  }

  getFormParameters(payload):Observable<any> {
    return this.http.post(`${this.url}/api/get-formula-fields/`, payload)
  }

  calculateResult(payload):Observable<any> {
    return this.http.post(`${this.url}/api/sample-form-has-calculate-result/`, payload)
  }
}
