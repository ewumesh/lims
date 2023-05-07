import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AddSampleService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  addSample(payload): Observable<any> {
    return this.http.post(`${this.url}/api/sample-form/`, payload);
  }

  getSampleDetails(sampleId): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/${sampleId}/`);
  }
}
