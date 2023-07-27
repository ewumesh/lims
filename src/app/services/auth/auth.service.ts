import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { LoginModel } from '../../models/login.model';
import { environment } from 'src/environments/environments';
import { RegisterModel } from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = environment.apiURL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }
  userLogin(payload: LoginModel): Observable<any> {
    return this.http.post(`${this.url}/api/account/auth/login/`, payload).pipe(map((data: any) => {
      localStorage.setItem('ACCESS_TOKEN', data.access);
      localStorage.setItem('REFRESH_TOKEN', data.refresh);
      localStorage.setItem('userDetails', JSON.stringify(data.user));

      return data;
    }))
  }

  getGetDepartmentTypes() :Observable<any> {
    return this.http.get(`${this.url}/api/account/department-types/`)
}

  objectToFormData(obj: any): FormData {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }

  userRegister(payload: any, registrationDoc, renewDoc, additionalDocuments): Observable<any> {
    delete payload['additionalDocs'];
    const formData:FormData = this.objectToFormData(payload);

    additionalDocuments.forEach((image,index) => {
      formData.append(`images[file]`, image.file);
      formData.append(`images[name]`, image.document_name);
    })


    if(registrationDoc) {
      formData.append('registration_document', registrationDoc, registrationDoc?.name);
    }

    if(renewDoc) {
      formData.append('renew_document', renewDoc, renewDoc?.name);
    }


    return this.http.post(`${this.url}/api/account/users/`, formData);
  }


  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  getRefreshToken():Observable<any> {
    let token:any = {
      value:localStorage.getItem('REFRESH_TOKEN')
    }
    return token;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
