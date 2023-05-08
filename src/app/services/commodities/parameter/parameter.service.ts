import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getParameters():Observable<any> {
    return this.http.get(`${this.url}/api/test-result/`)
  }

  getCommodities():Observable<any> {
    return this.http.get(`${this.url}/api/commodity/`)
  }

  addParameter(payload: any):Observable<any>  {
    return this.http.post(`${this.url}/api/test-result/`, payload);
  }

  updateParameter(payload: any, id:number):Observable<any> {
    return this.http.put(`${this.url}/api/test-result/${id}/`, payload);
  }

  deleteParameter(id:number):Observable<any> {
    return this.http.delete(`${this.url}/api/test-result/${id}`);
  }

}
