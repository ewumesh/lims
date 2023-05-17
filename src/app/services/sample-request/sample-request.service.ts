import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SampleRequestsService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  getAllSampleRequsets(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&form_available=smu`)
  }

  getUsersList(payload):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&role=${payload.role}&client_category_id=${payload.client_category_id}`);
  }

  sampleRequestPayment(payload): Observable<any> {
    return this.http.post(`${this.url}/api/sample-form-has-payment/`, payload)
  }

  assignSampleToSupervisor(payload, id):Observable<any> {
    // return this.http.post(`${this.url}/api/sample-form-has-parameter-assign-users/`, payload)
    return this.http.patch(`${this.url}/api/sample-form/${id}/`, payload)
  }
}
