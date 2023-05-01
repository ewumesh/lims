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

  getUserRequests(): Observable<any> {
    return this.http.get(`${this.url}/api/user-requests`).pipe(map((data: any) => {
      console.log(data, "DTAA")
      return data;
    }))
  }
}
