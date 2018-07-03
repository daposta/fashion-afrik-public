import { Injectable } from '@angular/core';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ShippingService {

  private shippingUrl = this.globals.SHIPPING_URL;
  authToken = localStorage.getItem('token');


  constructor(private http: HttpClient, private globals: Globals) { }


  saveShippingInfo(shipping: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW', 'Authorization': 'JWT ' + this.authToken
      })
    }

    return this.http.post(this.shippingUrl, shipping, httpOptions)

  }

}
