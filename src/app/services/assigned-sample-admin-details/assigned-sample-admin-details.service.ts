import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AssignedSampleAdminDetailsService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAssignedSampleDetails(payload):Observable<any>{
    return this.http.get(`${this.url}/api/report/detail-sample-form-has-parameter-has-assigned-analyst/${payload.id}/`)
  }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }

  getUserDetails(userId):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/${userId}/`);
  }
}
