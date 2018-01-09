import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable()
export class PaymentService {

    private ordersUrl = this.globals.PAYMENTS_URL;

  constructor(private http: Http, private globals: Globals,  private router:Router) { }

  processPayment(info:any){
  	   let v = this.page_header();
     return  this.http.post(this.ordersUrl, info, v)
       .map(this.extractData)
        .catch(this.handleErrorObservable);
  }

     private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


     private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }


     private page_header(){
     let data =  localStorage.getItem('auth_token');
      let headers = new Headers();
      let opt: RequestOptions;
      headers.append('Authorization', 'JWT ' + data );
      opt = new RequestOptions({headers: headers})  ;
      return opt;
  };

}
