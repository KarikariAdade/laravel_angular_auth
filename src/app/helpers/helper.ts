import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class Helper {

  constructor() {}

  toggleClass = '';

  public classObj = {
    'success': 'alert alert-success',
    'error': 'alert alert-danger'
  };


  handleClass(code:number){

    if (code == 200){

      return this.classObj.success

    }else{

      return this.classObj.error

    }
  }

}
