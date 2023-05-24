import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  changePassword(payload, query, userToken):Observable<any> {
    return this.http.patch(`${this.url}/api/email-management/password-reset/${query}/${userToken}`, payload)
  }
}
