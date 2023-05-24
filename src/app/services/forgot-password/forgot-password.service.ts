import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  forgotPassword(payload): Observable<any> {
    return this.http.post(`${this.url}/api/email-management/password-reset/`, payload)
  }
}
