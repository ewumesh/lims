import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AddSampleService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  addSample(payload): Observable<any> {
    return this.http.post(`${this.url}/api/sample-form/`, payload);
  }

  getSampleDetails(sampleId): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/${sampleId}/`);
  }

  getCommodities():Observable<any> {
    return this.http.get(`${this.url}/api/commodity/`)
  }

  updateSample(payload): Observable<any> {
    return this.http.put(`${this.url}/api/sample-form/${payload.id}/`, payload)
  }

  getUsersList(payload):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&role=${payload.role}&client_category_id=${payload.client_category_id}`);
  }
}
