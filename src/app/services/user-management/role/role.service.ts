import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getUserRoles(): Observable<any> {
    return this.http.get(`${this.url}/api/account/groups/`);
  }

  createUserRole(payload):Observable<any> {
    return this.http.post(`${this.url}/api/account/groups/`,payload);
  }

  updateUserRole(payload):Observable<any> {
    return this.http.put(`${this.url}/api/account/groups/${payload.id}/`, payload)
  }

  deleteUserRole(payload): Observable<any> {
    return this.http.delete(`${this.url}/api/account/groups/${payload.id}/`);
  }
}
