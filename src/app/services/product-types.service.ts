import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductTypesService {

  private productTypeURL = this.globals.PRODUCTS_TYPES_URL;
  constructor(private http: HttpClient, private globals: Globals) { }

  // fetchProductTypes(category?: string){

  //   return this.http.get(this.productTypeURL  +'?&category=' + category)
  //             .map(this.extractData)
  //       .catch(this.handleErrorObservable);
  // };

  fetchProductTypes(category?: string): Observable<any> {
    // let params = new HttpParams().set('l1category', category)

    return this.http.get(this.productTypeURL + '?&l1category=' + category)
  }

  // private extractData(res: Response) {
  //     let body = res.json();
  //     return body || {};
  // }


  // private handleErrorObservable (error: Response | any) {
  //   console.error(error.message || error);
  //   return Observable.throw(error.message || error);
  // }




}
