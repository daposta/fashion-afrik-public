import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ExchangeRateService {

  private ratesUrl = this.globals.EXCHANGE_RATES_URL; 

  constructor(private http: Http, private globals: Globals,  private router:Router) { }

  fetchRates(){
  	 
    return this.http.get(this.ratesUrl, )
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  };


  private page_header(){
     let data =  localStorage.getItem('auth_token');
      let headers = new Headers();
      let opt: RequestOptions;
      headers.append('Authorization', 'JWT ' + data );
      opt = new RequestOptions({headers: headers})  ;
      return opt;
  }

   private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };



}
