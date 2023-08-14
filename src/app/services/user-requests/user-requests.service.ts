import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class UserRequestsService {

  url = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  getUserRequests(payload): Observable<any> {
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&is_verified=0&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}&role=${payload.role}&client_category_id=${payload.clientCategory}&is_reject=0&is_recheck=${payload.is_recheck}`);
  }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }

  getUserRoles():Observable<any> {
    return this.http.get(`${this.url}/api/account/roles/`);
  }
  downloadReport(payload) {
    let url = `${this.url}/api/report/get-report/${payload.report_name}/${payload.report_type}/${payload.report_lang}/`
    this.http.get(url);

    window.location.href = url;

    // return url;
  }
}
