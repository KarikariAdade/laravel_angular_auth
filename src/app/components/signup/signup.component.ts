import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { ApiServiceService } from './../../services/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private apiService : ApiServiceService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  public error:any = null;


  onSubmit(){



    this.apiService.signup(this.form).subscribe(
      (response:any) => {
        if(response.code == 402){
          console.log('error exist')
          this.handleError(response.msg);
        }else{
          this.handleResponse(response);
        }

      },
      (error) => {
        this.handleError(error);
      }
    )

  }

  handleResponse(data:any) {
    // handle token service
    this.token.handle(data.access_token);

    // change the auth status observable
    this.auth.changeAuthStatus(true);

    // redirect user to profile
    this.router.navigateByUrl('/profile');

  }

  handleError(error:string) {
    this.error = error;
  }

}
