import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  api_url = environment.apiUrl;

  appendUrl(url:string){
    return this.api_url+url;
  }

  constructor(private http: HttpClient) { }

  signup(data:any){
    return this.http.post(this.appendUrl('/signup'), data);
  }

  login(data:any){
    return this.http.post(this.appendUrl('/login'), data);
  }

  sendPasswordResetLink(data:any){
    return this.http.post(this.appendUrl('/sendPasswordResetLink'), data);
  }

}
