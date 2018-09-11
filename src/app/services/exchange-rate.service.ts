import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ExchangeRateService {

  private ratesUrl = this.globals.EXCHANGE_RATES_URL;

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchRates(): Observable<any> {

    return this.http.get(this.ratesUrl)
    // return this.http.get(this.ratesUrl, )
    //           .toPromise()
    //           .then(response => response.json())
    //           .catch(this.handleError);
  };
}
