import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getWeek(){
    return this.http.get(this.apiUrl + "status/7");
  }

  getYear(){
    return this.http.get(this.apiUrl + "status/12");
  }

  getFeature(){
    return this.http.get(this.apiUrl + "feature/");
  }
}

