import { Injectable } from '@angular/core';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PaymentService {

  private ordersUrl = this.globals.PAYMENTS_URL;
  private paymentsUrl = this.globals.CARDPAYMENT_URL;
  authToken = localStorage.getItem('token');

  constructor(private http: HttpClient, private globals: Globals) { }

  processPayment(info: any): Observable<any> {

    const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

    return this.http.post(this.ordersUrl, info, { headers })
  }

  makePayment(payment: any): Observable<any> {

    const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

    return this.http.post(this.paymentsUrl, payment, { headers })
  }

}
