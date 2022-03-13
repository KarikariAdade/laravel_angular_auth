import { Helper } from './../../../helpers/helper';
import { ApiServiceService } from './../../../services/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  constructor(
    private apiService: ApiServiceService,
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
      (res) => {},
      (error) => {}
    )
  }

}
