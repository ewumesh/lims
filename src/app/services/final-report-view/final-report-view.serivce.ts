import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FinalReportViewService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAssignedSamples(payload):Observable<any> {
    return this.http.get(`${this.url}/api/report/detail-sample-form-has-parameter-has-assigned-analyst/${payload.id}/`)
  }

  sendReportForVerification(payload):Observable<any> {
    return this.http.post(`${this.url}/api/sample-form-has-verifier/`, payload)
  }

  isSentForVrification(payload):Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-has-verifier/?sample_form_id${payload.id}`)
  }


  
  downloadReport(payload) :Observable<any> {
    let url = `${this.url}/api/report/get-single-report/${payload.report_name}/${payload.report_type}/${payload.lang}/${payload.id}/${payload.role}`;
    window.location.href = url;
    return this.http.get(url);
  }

  downloadReportNepali(payload) {
    let base = 'https://pdfmachine.kantipurinfotech.com.np/public'
    let url = `${base}/api/show-pdf-report/${payload.id}/${payload.role}/`;
    // window.location.href = url;
    window.open(url, "_blank");
    return this.http.get(url);
  }

  getRawData(id):Observable<any> { 
    return this.http.get(`${this.url}/api/sample-form-raw-data-sheet-global/${id}/`)
  } 

  getAnalystRawData(id):Observable<any> {
    return this.http.get(`${this.url}/api/detail-raw-data-sheet/${id}/`)
  }

  getSupervisorRawData(id): Observable<any> {
    return this.http.get(`${this.url}/api/sample-form-raw-data-sheet-test-type/${id}/`)
    // /api/sample-form-raw-data-sheet-test-type/345/
  }

  downloadRawData(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/download/eng/${id}/`;
    window.location.href = url;
    return this.http.get(`${url}`)
  }

  printRawData(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/print/eng/${id}/`

    window.open(url, "_blank");
    return this.http.get(`${url}`)
  }

  downloadRawDataAnalyst(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/download/eng/${id}/`;
    window.location.href = url;
    return this.http.get(`${url}`)
  }

  getUserDetails(userId):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/${userId}/`);
  }

  printRawDataAnalyst(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/print/eng/${id}/`

    window.open(url, "_blank");
    return this.http.get(`${url}`)
  }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }

  downloadRawDataSupervisor(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/download/eng/${id}/`;
    window.location.href = url;
    return this.http.get(`${url}`)
  }

  printRawDataAnalystSupervisor(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/print/eng/${id}/`

    window.open(url, "_blank");
    return this.http.get(`${url}`)
  }
}
