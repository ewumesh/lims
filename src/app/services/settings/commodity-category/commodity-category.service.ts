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

  getAllCommodityCategoriesLimited(payload):Observable<any> {
    return this.http.get(`${this.url}/api/get-commodity-category-only/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`)
  }

  getAllCommodityCategories(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity-category/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`)
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

  downloadReport(payload) {
    let url = `${this.url}/api/report/get-report/${payload.report_name}/${payload.report_type}/${payload.report_lang}/`
    this.http.get(url);

    window.location.href = url;

    // return url;
  }
}
