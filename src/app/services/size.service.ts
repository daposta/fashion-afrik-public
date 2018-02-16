import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
declare var $: any;



@Injectable()
export class SizeService {

  private sizesUrl = this.globals.SIZES_URL; 

  constructor(private http: Http, private globals: Globals,  private router:Router) { }

  fetchSizes(){
  	  let v = this.page_header();
    return this.http.get(this.sizesUrl, v)
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
