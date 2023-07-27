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

  getParameters(payload):Observable<any> {
    return this.http.get(`${this.url}/api/test-result/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`)
  }

  getCommodities(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}`)
  }

  addParameter(payload: any):Observable<any>  {
    return this.http.post(`${this.url}/api/test-result/`, payload);
  }

  getIndividualParameter(payload):Observable<any> {
    return this.http.get(`${this.url}/api/test-result/${payload.id}/`)
  }

  updateParameter(payload: any, id:number):Observable<any> {
    return this.http.put(`${this.url}/api/test-result/${id}/`, payload);
  }

  deleteParameter(id:number):Observable<any> {
    return this.http.delete(`${this.url}/api/test-result/${id}`);
  }

  downloadReport(payload) {
    let url = `${this.url}/api/report/get-report/${payload.report_name}/${payload.report_type}/${payload.report_lang}/`
    this.http.get(url);

    window.location.href = url;

    // return url;
  }

}
