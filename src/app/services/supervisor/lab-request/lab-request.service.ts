import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LabRequestService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAllAssignedSamples(payload): Observable<any> {
    return this.http.get(`${this.url}/api/report/sample-form-has-assigned-analyst/?search=${payload.search}&created_date__date__gte=${payload.to}&created_date__date__lte=${payload.to}`)
    // return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users?search=${payload.serarch}&limit=${payload.size}&offset=${payload.page}&from=${payload.from}&to=${payload.to}`)
  }
}
