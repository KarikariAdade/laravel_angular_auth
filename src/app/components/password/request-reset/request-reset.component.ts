import { Helper } from './../../../helpers/helper';
import { ApiServiceService } from './../../../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  constructor(
    private apiService: ApiServiceService,
    private snotifyService: SnotifyService
    // private helper: Helper,
  ) { }

  ngOnInit(): void {
  }


  public error = null;

  public form = {
    email: null
  }


  onSubmit(){
    this.apiService.sendPasswordResetLink(this.form).subscribe(
      (res:any) => {
        if(res.code == 200){
          this.snotifyService.success('Example body content', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        }else{

        }

      },
      (error) => {}
    )
  }

  handleResponse(data: any){
    this.form.email = null;
  }

}
