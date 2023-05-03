import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  url = environment.apiURL

  constructor(private http: HttpClient) {}

  getPermissions():Observable<any> {
    return this.http.get(`${this.url}/api/account/permission-has-group/`)
  }

  getUserRoles(): Observable<any> {
    return this.http.get(`${this.url}/api/account/groups/`);
  }

  savePermissions(payload): Observable<any> {
    return this.http.post(`${this.url}/api/account/permission-has-group/`, payload)
  }
}
