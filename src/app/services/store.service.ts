import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class StoreService {
	
  private storesURL =   this.globals.STORES_URL;

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchStores(store?: string): Observable<any> {
    let tempStoreURL = this.storesURL;
    if (store) {
      tempStoreURL = tempStoreURL + store;
    }

    return this.http.get(tempStoreURL)
  }


  // fetchStores(store?: string){
  // 	let tempStoreURL = this.storesURL
  //   if(store){
  //     tempStoreURL = tempStoreURL + store;
  //   }
  //   return this.http.get(tempStoreURL)
  //              .map(this.extractData)
  //       .catch(this.handleErrorObservable);
  // };


  

 

  //  private handleError(error: any) {
  //   return Promise.reject(error.message || error);
  // };

  // private extractData(res: Response) {
  //       let body = res.json();
  //       return body || {};
  //   }


    // private handleErrorObservable (error: Response | any) {
    //   return Observable.throw(error.message || error);
    // }

}
