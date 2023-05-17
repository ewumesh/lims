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
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&is_verified=0`);
  }
}
