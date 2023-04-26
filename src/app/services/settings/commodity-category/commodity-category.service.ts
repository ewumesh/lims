import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CommodityCategoryService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAllCommodityCategories():Observable<any> {
    return this.http.get(`${this.url}/api/commodity-category/`)
  }

  addCategory(payload: any):Observable<any>  {
    return this.http.post(`${this.url}/api/commodity-category/`, payload);
  }

  updateCategory(payload: any, id:number):Observable<any> {
    return this.http.put(`${this.url}/api/commodity-category/${id}/`, payload);
  }

  deleteCategory(id:number):Observable<any> {
    return this.http.delete(`${this.url}/api/commodity-category/${id}`);
  }
}
