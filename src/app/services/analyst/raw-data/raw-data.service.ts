import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RawDataService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  // getRawDataSheet():Observable<any> {
  //   return;
  // }
}
