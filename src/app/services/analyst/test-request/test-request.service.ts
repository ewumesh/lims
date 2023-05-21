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
    return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users/?form_available=analyst&analyst_user=${payload.user}&search=${payload.search}`);
  }


  getAllCommodities(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`);
  }

}
