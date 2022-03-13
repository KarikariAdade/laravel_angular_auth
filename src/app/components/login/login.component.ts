import { TokenService } from './../../services/token.service';
import { ApiServiceService } from './../../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }


  constructor(
    private apiService: ApiServiceService,
    private token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  public form = {
    email: null,
    password: null
  };

  public error = null;

  onSubmit() {
    this.apiService.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data:any) {
    this.token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error:any) {
    this.error = error.error.error;
  }


}
