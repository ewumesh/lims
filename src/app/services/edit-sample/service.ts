import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EditSampleService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }

  addSample(payload?): Observable<any> {
    // let finalData = {
    //   sampleForm: payload,
    //   image: image
    // }
    return this.http.post(`${this.url}/api/sample-form/`, payload);
  }

  getSampleDetails(sampleId): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/${sampleId}/`);
  }

  getCommodities(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&offset=${payload.page}&limit=${payload.size}`)
  }

  getCommoditiesLimited(payload):Observable<any> {
    return this.http.get(`${this.url}/api/get-commodity-data-with-parameters/?search=${payload.search}&offset=${payload.page}&limit=${payload.size}`)
  }

  updateSample(payload, id): Observable<any> {
    return this.http.put(`${this.url}/api/sample-form/${id}/`, payload)
  }

  getUsersList(payload):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&role=${payload.role}&client_category_id=${payload.client_category_id}&is_verified=1`);
  }

  getUsersListLimited(payload):Observable<any> {
    return this.http.get(`${this.url}/api/account/get-limited-user-data/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&role=${payload.role}&client_category_id=${payload.client_category_id}&is_verified=1&is_active=1`);
  }
}
