import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable()
export class StoreService {
	
  private storesURL =   this.globals.STORES_URL;

  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  fetchStores(){
  	
    return this.http.get(this.storesURL)
               .map(this.extractData)
        .catch(this.handleErrorObservable);
  };


  getStore(x:any){


  }

 

   private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
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
