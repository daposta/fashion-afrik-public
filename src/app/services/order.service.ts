import { Injectable } from '@angular/core';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {

  private ordersUrl = this.globals.ORDERS_URL;
  private createOrdersUrl = this.globals.CREATEORDER_URL;
  authToken = localStorage.getItem('token');
  customer = JSON.parse(localStorage.getItem('customer'));

  constructor(private http: HttpClient, private globals: Globals) { }

  saveOrder(cart: any): Observable<any> {
    let data = {};

    data['cart'] = cart;
    data['currency'] = localStorage.getItem('currency');

    const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

    return this.http.post(this.ordersUrl, data, { headers })
  }

  postOrder(data: any): Observable<any> {

    // console.log(data);

    const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

    return this.http.post(this.createOrdersUrl, data, { headers })
  }

  getOrders(): Observable<any> {

    const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

    return this.http.get(this.ordersUrl, { headers })
  }
}
