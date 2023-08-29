import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  resendVerificationLink(payload):Observable<any> {
    return this.http.post(`${this.url}/api/email-management/send-verification-to-email/`,payload);
  }

  verifyUser(payload):Observable<any> {
    return this.http.post(`${this.url}/api/email-management/verify-email-confirm/`, payload)
  }

  toggleUserActivation(payload): Observable<any> {
    let p = {
      is_active: payload.is_active
    }
    return this.http.patch(`${this.url}/api/account/users/${payload.id}/`,p);
  }

  deactivateUser(userId: number): Observable<any> {
    return this.http.delete(`${this.url}/api/account/users/${userId}/`);
  }
}
