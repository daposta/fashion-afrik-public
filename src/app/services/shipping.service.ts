import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShippingService {

  private shippingUrl = this.globals.SHIPPING_URL;


  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  saveShippingInfo(review:any, product:any){
     
    //  headers.append('Content-Type', 'multipart/form-data');
     let formData = new FormData();
        formData.append("reviewer_email", review['email']);
        formData.append('reviewer_name', review['name']);
        formData.append('comment', review['comment']);
         formData.append('product', review['product']);
     
       

     this.http.post(this.shippingUrl, formData).subscribe(
         res => {
             let msg = JSON.parse(res['_body'])['message'];
              // $.toast({
              //     text: msg,
              //      position: 'top-center',
              //      'icon': 'success',
              //     showHideTransition: 'slide',
              // });
               product.reviews.push(JSON.parse(res['_body']));
             //this.router.navigateByUrl('products');
         },
         error =>{
        
        let msg = JSON.parse(error._body)['message'];
        // $.toast({
        //     text: msg,
        //      position: 'top-center',
        //      icon: 'error',
        //      showHideTransition: 'slide',
        // });
      })
   }

}
