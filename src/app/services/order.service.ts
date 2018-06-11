// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { Router } from '@angular/router';
// import { Globals } from '../shared/api';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// declare var $: any;

@Injectable()
export class OrderService {

  private ordersUrl = this.globals.ORDERS_URL;
  authToken = localStorage.getItem('auth_token');
  customer = JSON.parse(localStorage.getItem('customer'));
  // user_id: String;

  constructor(private http: HttpClient, private globals: Globals) { }

  saveOrder(cart: any): Observable<any> {    
    let data = {};
    
    // this.user_id = this.customer.id;
    // console.log(this.user_id);
    console.log(this.customer);

    data['cart'] = cart;
    data['currency'] = localStorage.getItem('currency');
    // data['user_id'] = this.user_id;

    const headers = new HttpHeaders({'Authorization': 'JWT ' + this.authToken})
    
    return this.http.post(this.ordersUrl, data, {headers})
  }


  // saveOrder(cart: any) {


  //   let v = this.page_header();
  //   let data = {};
  //   data['cart'] = cart;
  //   data['currency'] = localStorage.getItem('currency');
  //   return this.http.post(this.ordersUrl, data, v)
  //     .map(this.extractData)
  //     .catch(this.handleErrorObservable);

  // }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }


  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private page_header() {
    let data = localStorage.getItem('auth_token');
    let headers = new Headers();
    let opt: RequestOptions;
    headers.append('Authorization', 'JWT ' + data);
    opt = new RequestOptions({ headers: headers });
    return opt;
  };


  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

}
