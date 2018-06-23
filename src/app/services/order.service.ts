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
  authToken = localStorage.getItem('token');
  customer = JSON.parse(localStorage.getItem('customer'));
  // user_id: String;

  constructor(private http: HttpClient, private globals: Globals) { }

  saveOrder(cart: any): Observable<any> {    
    let data = {};

    data['cart'] = cart;
    data['currency'] = localStorage.getItem('currency');

    const headers = new HttpHeaders({'Authorization': 'JWT ' + this.authToken})
    
    return this.http.post(this.ordersUrl, data, {headers})
  }

}
