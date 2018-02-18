import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

declare var $: any;


@Injectable()
export class ShippingService {

  private shippingUrl = this.globals.SHIPPING_URL;


  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  saveShippingInfo(shipping:any){
     
    //  headers.append('Content-Type', 'multipart/form-data');
     let formData = new FormData();
        formData.append("addressline1", shipping['addressLine1']);
        formData.append('addressline2', shipping['addressLine2']);
        formData.append('city', shipping['city']);
         formData.append('country', shipping['country']);
      formData.append('zipcode', shipping['zipCode']);
      formData.append('recipient', shipping['recipient']);
      let order = JSON.parse(localStorage.getItem('checkout'))['order'].id;
    
       formData.append('order', order);


       let v = this.page_header();
     
       

     return  this.http.post(this.shippingUrl, formData, v).map(this.extractData)
        .catch(this.handleErrorObservable);
      
   }

   private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


     private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }


   private page_header(){
     let data =  localStorage.getItem('auth_token');
      let headers = new Headers();
      let opt: RequestOptions;
      headers.append('Authorization', 'JWT ' + data );
      opt = new RequestOptions({headers: headers})  ;
      return opt;
  };


   private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };


}
