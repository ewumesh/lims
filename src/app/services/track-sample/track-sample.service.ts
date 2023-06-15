import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TrackSampleService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getSampleDetails(payload): Observable<any> {
    return this.http.get(`${this.url}/api/report/track-report-sample-form/?search=${payload.search}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}&status=${payload.status}`)
  }

  getStatus():Observable<any> {
    return this.http.get(`${this.url}/api/report/status/`);
  }
}
