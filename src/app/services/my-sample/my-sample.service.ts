import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MySampleService {

  url= environment.apiURL;

  constructor(private http: HttpClient) {

  }

  getMySamples(payload): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/?search=${payload.search}&owner_user=${payload.user}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}`);
  }

  deleteSample(id):Observable<any> {
    return this.http.delete(`${this.url}/api/sample-form/${id}/`)
  }
  getAllCommodities():Observable<any> {
    return this.http.get(`${this.url}/api/commodity`)
  }
}
