import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FiscalYearService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getFiscalYear():Observable<any> {
    return this.http.get(`${this.url}/api/fiscal-year/`)
  }

  addFiscalYear(payload):Observable<any> {
    return this.http.post(`${this.url}/api/fiscal-year/`,payload);
  }

  deleteFiscalYear(id):Observable<any> {
    return this.http.delete(`${this.url}/api/fiscal-year/${id}`)
  }

  updateFiscalYear(payload): Observable<any> {
    return this.http.put(`${this.url}/api/fiscal-year/${payload.id}/`, payload);
  }
}
