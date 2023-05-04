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

  getAllCommodities():Observable<any> {
    return this.http.get(`${this.url}/api/commodity/`);
  }
}
