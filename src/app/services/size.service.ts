import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';



@Injectable()
export class SizeService {

  private sizesUrl = this.globals.SIZES_URL; 

  constructor(private http: Http, private globals: Globals) { }

  fetchSizes(){
    return this.http.get(this.sizesUrl)
               .map(this.extractData)
        .catch(this.handleErrorObservable);
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

   private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }


}
