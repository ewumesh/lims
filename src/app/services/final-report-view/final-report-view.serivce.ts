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
    let devUrl = `https://pdfmachine.kantipurinfotech.com.np/public/api/stag/show-english-pdf-report/${payload.id}/${payload.role}`
    let newUrl = `https://pdfmachine.kantipurinfotech.com.np/public/api/show-english-pdf-report/${payload.id}/${payload.role}`;
    // let url = `${this.url}/api/report/get-single-report/${payload.report_name}/${payload.report_type}/${payload.lang}/${payload.id}/${payload.role}`;
    window.location.href = newUrl;
    return this.http.get(devUrl);
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
    let nURL = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`
    // let url = `${this.url}/api/report/get-report-raw-data/download/eng/${id}/`;
    let url;
    // if(this.url.startsWith("https://staginglims.kantipurinfotech.com.np")) {
    //   url = `https://pdfmachine.kantipurinfotech.com.np/public/api/stage/rawdata/${id}/`;
    // } else if(this.url.startsWith("https://staginglims.kantipurinfotech.com.np")) {
      url = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`
    // }

    window.location.href = url;
    return this.http.get(`${url}`)
  }

  printRawData(id):Observable<any> {
    // let url = `${this.url}/api/report/get-report-raw-data/print/eng/${id}/`
    // let nURL = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`

    let url;
    // if(this.url.startsWith("https://staginglims.kantipurinfotech.com.np")) {
    //   url = `https://pdfmachine.kantipurinfotech.com.np/public/api/stage/rawdata/${id}/`;
    // } else if(this.url.startsWith("https://staginglims.kantipurinfotech.com.np")) {
      url = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`
    // }

    window.open(url, "_blank");
    return this.http.get(`${url}`)
  }

  downloadRawDataM(id):Observable<any> {
    // let nURL = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`
    let url = `${this.url}/api/report/get-report-raw-data/download/eng/${id}/`;
    window.location.href = url;
    return this.http.get(`${url}`)
  }

  printRawDataM(id):Observable<any> {
    let url = `${this.url}/api/report/get-report-raw-data/print/eng/${id}/`
    // let nURL = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`

    window.open(url, "_blank");
    return this.http.get(`${url}`)
  }

  downloadRawDataAnalyst(id):Observable<any> {
    // let url = `https://pdfmachine.kantipurinfotech.com.np/public/api/stage/rawdata/${id}/`;
    let nURL = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`
    window.location.href = nURL;
    return this.http.get(`${nURL}`)
  }

  getUserDetails(userId):Observable<any> {
    return this.http.get(`${this.url}/api/account/users/${userId}/`);
  }

  printRawDataAnalyst(id):Observable<any> {
    let nURL = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`
    // let url = `${this.url}/api/report/get-report-raw-data/print/eng/${id}/`

    window.open(nURL, "_blank");
    return this.http.get(`${nURL}`)
  }

  getCategories():Observable<any> {
    return this.http.get(`${this.url}/api/client-category/`);
  }

  downloadRawDataSupervisor(id):Observable<any> {
    // let url = `https://pdfmachine.kantipurinfotech.com.np/public/api/stage/rawdata/${id}/`;
    let nURL = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`
    window.location.href = nURL;
    return this.http.get(`${nURL}`)
  }

  printRawDataAnalystSupervisor(id):Observable<any> {
    // let url = `${this.url}/api/report/get-report-raw-data/print/eng/${id}/`
    let nURL = `https://pdfmachine.kantipurinfotech.com.np/public/api/rawdata/${id}/`

    window.open(nURL, "_blank");
    return this.http.get(`${nURL}`)
  }
}
