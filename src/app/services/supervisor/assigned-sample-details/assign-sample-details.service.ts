import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AssignedSampleDetailsService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAssignedSamples(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-parameter-assign-users?sample_form=${payload.sampleId}&form_available=analyst`)
  }
}
