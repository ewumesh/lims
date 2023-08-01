import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AssignedSampleAdminService {

  url= environment.apiURL;

  constructor(private http: HttpClient){}

  getAssignedSampleDetails(payload):Observable<any> {
    return this.http.get(`${this.url}/api/report/sample-form-assigned-for-smu-superadmin/?search=${payload.search}&created_date__date__gte=${payload.from}&created_date__date__lte=${payload.to}&status=${payload.status}&client_category_detail__client_category=${payload.client_category}`)
  }

  getStatusList(payload?):Observable<any> {
    return this.http.get(`${this.url}/api/report/status/assigned-sample/`)
  }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }
}
