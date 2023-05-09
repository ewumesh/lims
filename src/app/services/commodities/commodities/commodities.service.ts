import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CommoditiesService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCommodities(payload): Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`);
  }

  addCommodity(payload):Observable<any> {
    return this.http.post(`${this.url}/api/commodity/`,payload);
  }

  updateCommodity(payload):Observable<any> {
    return this.http.put(`${this.url}/api/commodity/`,payload);
  }

  deleteCommodity(commodityId):Observable<any> {
    return this.http.delete(`${this.url}/api/commodity/${commodityId}/`);
  }
}
