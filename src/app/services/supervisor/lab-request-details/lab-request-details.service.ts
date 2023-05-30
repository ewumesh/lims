import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LabRequestDetailsService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getSamples(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/${payload.id}/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&supervisor_user=${payload.supervisor}`)
  }

  getCommodities(payload): Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`);
  }

  assignSampleToAnalyst(payload) {
    return this.http.post(`${this.url}/api/sample-form-has-parameter-assign-users/`, payload);
  }

  getUsersList(payload):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&role=${payload.role}&client_category_id=${payload.client_category_id}`);
  }
}
