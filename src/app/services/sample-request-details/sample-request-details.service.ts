import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SampleRequestDetailsService {

  url = environment.apiURL;

  constructor(private http: HttpClient) {}


  getSampleDetails(payload): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/${payload.id}/`)
  }

  getCommodities(payload): Observable<any> {
    return this.http.get(`${this.url}/api/commodity/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}`);
  }

  getAllSampleRequsets(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&form_available=smu`)
  }

  getUsersList(payload):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/?search=${payload.search}&limit=${payload.size}&offset=${payload.page}&role=${payload.role}&client_category_id=${payload.client_category_id}`);
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

  sampleRequestPayment(payload, image?):Observable<any> {
    // let formData:FormData;
    // payload.forEach(a => {
    //  formData = this.objectToFormData(a)
    //   formData.append('payment_receipt', a.image);
    // })

    return this.http.post(`${this.url}/api/sample-form-has-payment/`, payload);

  }

  assignSampleToSupervisor(payload, id):Observable<any> {
    // return this.http.post(`${this.url}/api/sample-form-has-parameter-assign-users/`, payload)
    return this.http.patch(`${this.url}/api/sample-form/${id}/`, payload)
  }

  rejectSample(payload):Observable<any> {
    return this.http.post(`${this.url}/api/sample-form-reject/`,payload)
  }
}
