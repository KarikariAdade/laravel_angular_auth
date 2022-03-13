import { ApiServiceService } from './api-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {



  constructor(private apiService: ApiServiceService) { }


  /* THIS WHOLE SERVICE HANDLES THE TOKEN PROCESS. TO PREVENT
  TO PREVENT PEOPLE FROM MANIPULATING THE TOKEN, WE RUN IT THROUGH THE
  ISVALIDTOKEN FUNCTION TO GET THE PAYLOAD, YOU FIRST HAVE TO
  VERIFY THE URL THE PAYLOAD IS COMING FROM (LARAVEL ENDPOINT)

  */

  tokenISS = {
    login : this.apiService.appendUrl('/login'),
    signup: this.apiService.appendUrl('/signup')
  }



  handle(token: any){
    this.setToken(token);
    console.log('this is the token payload', this.isValidToken())
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }


  removeToken(){
    localStorage.removeItem('token');
  }

  isValidToken(){
    const token = this.getToken();

    if(token){
      const payload = this.tokenPayload(token);

      if(payload){
        // Check if index is greater than 0
        return Object.values(this.tokenISS).indexOf(payload.iss) > -1 ? true : false;
      }

    }

    return false;
  }

  tokenPayload(token:any){
    const payload = token.split('.')[1];
    return this.tokenDecode(payload);
  }


  tokenDecode(payload: string){
    console.log('decoded token', JSON.parse(atob(payload)))
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    return this.isValidToken();
  }
}
