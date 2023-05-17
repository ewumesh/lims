import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AllUsersService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }

  getUsersList(payload):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&role=${payload.role}&client_category_id=${payload.client_category_id}`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.url}/api/account/users/${userId}/`);
  }

  getUserRoles():Observable<any> {
    return this.http.get(`${this.url}/api/account/roles/`);
  }

  // addCategory(payload: any):Observable<any>  {
  //   return this.http.post(`${this.url}/api/client-category/`, payload);
  // }

  // updateCategory(payload: any, id:number):Observable<any> {
  //   return this.http.put(`${this.url}/api/client-category/${id}/`, payload);
  // }

  // deleteCategory(id:number):Observable<any> {
  //   return this.http.delete(`${this.url}/api/client-category/${id}`);
  // }
}
