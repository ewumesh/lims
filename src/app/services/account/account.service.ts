import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getProfileDetails(userId:number):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/${userId}/`)
  }

  getClientCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }

  getUserRoles(): Observable<any> {
    return this.http.get(`${this.url}/api/account/roles/`);
  }

  changePassword(payload):Observable<any> {
    return this.http.put(`${this.url}/api/account/users/${payload.id}/`, payload)
  }
}
