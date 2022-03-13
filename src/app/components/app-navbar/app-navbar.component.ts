import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  public loggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
  ) { }

  // upon init, subscribe to the authstatus observable to check
  // if user is logged in or not
  ngOnInit(): void {
    this.auth.authStatus.subscribe(
      (value) => this.loggedIn = value
    )
  }

  logOut(e: MouseEvent){
    e.preventDefault();

    // Remove token
    this.token.removeToken();

    // Change auth observable
    this.auth.changeAuthStatus(false);

    this.router.navigateByUrl('/login');


  }

}
