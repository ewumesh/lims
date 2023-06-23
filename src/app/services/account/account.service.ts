import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getProfileDetails(userId:number):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/${userId}/`)
  }

  getGetDepartmentTypes() :Observable<any> {
    return this.http.get(`${this.url}/api/account/department-types/`)
}

  getClientCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }

  getUserRoles(): Observable<any> {
    return this.http.get(`${this.url}/api/account/roles/`);
  }

  changePassword(payload):Observable<any> {
    return this.http.patch(`${this.url}/api/account/users/${payload.id}/`, payload)
  }

  updateUser(payload, doc?,renewDoc?):Observable<any> {
    const formData:FormData = this.objectToFormData(payload);
    if(doc) {
    formData.append('registration_document', doc, doc?.name);
    }
    if(renewDoc) {
    formData.append('renew_document', renewDoc, renewDoc?.name);
    }
    return this.http.put(`${this.url}/api/account/users/${payload.id}/`, formData)
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
}
