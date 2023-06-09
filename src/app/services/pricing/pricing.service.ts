import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  getAllCommodities(payload):Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&category_id=${payload.category}`)
  }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/commodity-category/`)
  }
}
