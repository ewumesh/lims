import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ViewUserDetailsService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getUserDetails(userId):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/${userId}/`);
  }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/?page=2&records=4`);
  }
}
