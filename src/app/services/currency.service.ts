import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

@Injectable()
export class CurrencyService {

  
  private currencysUrl = this.globals.CURRENCYS_URL; 

  constructor(private http: Http, private globals: Globals) { }

  fetchCurrencys(){
  	  
    return this.http.get(this.currencysUrl)
               .map(this.extractData)
        .catch(this.handleErrorObservable);
  };


  private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }

}
