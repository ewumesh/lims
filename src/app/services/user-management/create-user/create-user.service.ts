import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/?page=2&records=4`);
  }

  getUserDetails(userId):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/${userId}/`);
  }

  createUser(payload: any):Observable<any> {
    return this.http.post(`${this.url}/api/account/users/`, payload)
  }

  updateUser(payload):Observable<any> {
    return this.http.put(`${this.url}/api/account/users/${payload.id}/`, payload)
  }

  getUserRole():Observable<any> {
    return this.http.get(`${this.url}/api/account/groups`);
  }
}
