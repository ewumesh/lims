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

//   #report_type:['pdf','excel','csv']
// #report_name:['admin-list','users-list','user-with-sample-form','sample-form','commodity','parameter']
  downloadReport(payload) {
    let url = `${this.url}/api/report/get-report/${payload.report_name}/${payload.report_type}/${payload.report_lang}/`
    this.http.get(url);

    window.location.href = url;

    // return url;
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
}
}
