import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

declare var $: any;

@Injectable()
export class OrderService {
  
  private ordersUrl = this.globals.ORDERS_URL;

  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  saveOrder(cart:any){
    
       
      let v = this.page_header();
      let data = {};
      data['cart'] = cart;
      data['currency'] = localStorage.getItem('currency');
     return  this.http.post(this.ordersUrl, data, v)
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


   private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

}
