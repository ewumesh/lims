import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportViewService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getMySamples(payload): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/?search=${payload.search}&owner_user=${payload.user}?from=${payload.from}?to=${payload.to}?status=${payload.status}`);
  }
}