import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ViewSampleService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

getSampleDetails(payload): Observable<any> {
  return this.http.get(`${this.url}/api/sample-form/${payload.id}/`)
}

getCommodities(payload): Observable<any> {
  return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`);
}
}
