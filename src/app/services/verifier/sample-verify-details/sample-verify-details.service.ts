import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SampleVerifyDetailsService {

  url = environment.apiURL;

  constructor(
    private http: HttpClient
  ) {}
}
