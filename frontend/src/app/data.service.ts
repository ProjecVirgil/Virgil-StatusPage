import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://api.projectvirgil.net/api/';

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    'Authorization': 'SECRET TOKEN'
  });
  
  getWeek(){    
    return this.http.get(this.apiUrl + "status/7",{ headers: this.headers });
  }

  getYear(){
    return this.http.get(this.apiUrl + "status/12",{ headers: this.headers });
  }

  getFeature(){
    return this.http.get(this.apiUrl + "feature/",{ headers: this.headers });
  }

  getService(){
    return this.http.get(this.apiUrl + "service/",{ headers: this.headers });
  }
}

