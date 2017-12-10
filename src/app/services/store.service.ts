import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StoreService {
	
  private storesURL =   this.globals.STORES_URL;

  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  fetchStores(){
  	
    return this.http.get(this.storesURL)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  };

   private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

}
