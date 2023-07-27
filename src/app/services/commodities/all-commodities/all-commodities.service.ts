import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AllCommoditiesService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  getAllCommodities(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&category_id=${payload.catetegory}`);
  }

  getCommodityCategories(): Observable<any> {
    return this.http.get(`${this.url}/api/commodity-category/`);
  }

  downloadReport(payload) {
    let url = `${this.url}/api/report/get-report/${payload.report_name}/${payload.report_type}/${payload.report_lang}/`
    this.http.get(url);

    window.location.href = url;

    // return url;
  }
}
