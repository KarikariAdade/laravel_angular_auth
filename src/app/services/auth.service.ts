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

  // The loggedIn being set an an observable value to authStatus ensures that
  // authStatus has the latest value when loggedIn value changes

  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value:boolean){
    // This changes the status of the loggedIn value when called
    this.loggedIn.next(value);
  }
}
