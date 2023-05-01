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

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`)
  }

  addCategory(payload: any):Observable<any>  {
    return this.http.post(`${this.url}/api/client-category/`, payload);
  }

  updateCategory(payload: any, id:number):Observable<any> {
    return this.http.put(`${this.url}/api/client-category/${id}/`, payload);
  }

  deleteCategory(id:number):Observable<any> {
    return this.http.delete(`${this.url}/api/client-category/${id}`);
  }
}
