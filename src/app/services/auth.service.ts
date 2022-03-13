import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* THIS SERVICE ENSURES THAT A USER IS LOGGED IN ACROSS
  ALL COMPONENTS */

  constructor(private token: TokenService) { }

  private loggedIn = new BehaviorSubject <boolean> (this.token.loggedIn() )

  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value:boolean){
    this.loggedIn.next(value);
  }
}
