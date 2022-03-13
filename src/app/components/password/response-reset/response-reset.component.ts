import { Helper } from './../../../helpers/helper';
import { ApiServiceService } from './../../../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    private helper: Helper,
    private notify: SnotifyService,
    private router: Router,
  ) {
    route.queryParamMap.subscribe(
      (params:any) => {
        this.form.resetToken = params.get('token');
      }
    )
  }

  toggleClass = '';

  ngOnInit(): void {
  }

  public error:string = '';

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }

  onSubmit(){
    this.apiService.changePassword(this.form).subscribe(

      (response:any) => {

        if(response.code == 200){

          this.toggleClass = this.helper.handleClass(response.code)

          this.handleResponse(response.msg)

        }else{
          this.toggleClass = this.helper.handleClass(response.code)

          this.handleError(response.msg)

        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  handleError(error:any){
    this.error = error;
  }

  handleResponse(msg:string){

    let _router = this.router;

    this.notify.confirm('Done!, Now login with new password', {
      buttons: [
        {text: 'Okay', action: toaster => {
          _router.navigateByUrl('/login'),
          this.notify.remove(toaster.id)
        }
        },
      ]
    });
    this.error = msg;
  }


  // handleClass(code:number){
  //   if (code == 200){
  //     this.toggleClass = this.classObj.success
  //   }else{
  //     this.toggleClass = this.classObj.error
  //   }
  // }
}
