import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ComoditiesService {

  url = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  getComodities(): Observable<any> {
    return this.http.get(`${this.url}/api/commodity-category`).pipe(map((data: any) => {
      return data;
    }))
  }
}
