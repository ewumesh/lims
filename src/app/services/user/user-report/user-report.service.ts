import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAssignedSamples(payload):Observable<any> {
    return this.http.get(`${this.url}/api/report/detail-sample-form-has-parameter-has-assigned-analyst/${payload.id}/`)
  }

  sendReportForVerification(payload):Observable<any> {
    return this.http.post(`${this.url}/api/sample-form-has-verifier/`, payload)
  }

  isSentForVrification(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-verifier/?sample_form_id=${payload.id}`)
  }

  downloadReport(payload) :Observable<any> {
    let url = `${this.url}/api/report/get-single-report/${payload.report_name}/${payload.report_type}/${payload.report_lang}/${payload.id}/5/`;
    setTimeout(() => {
      window.location.href = url;
    }, 500);

    return this.http.get(url)
  }

  downloaReportNepali(payload):Observable<any> {
    let link = `https://pdfmachine.kantipurinfotech.com.np/public/api/pdf-report/${payload.id}/`
    // let url = `${link}/${payload.id}`
    window.location.href = link;
    return this.http.get(link);
  }
}
