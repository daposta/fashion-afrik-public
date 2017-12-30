import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class OrderService {
  
  private ordersUrl = this.globals.ORDERS_URL;

  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  saveOrder(cart:any){
     
    //  headers.append('Content-Type', 'multipart/form-data');
   
     
       

     this.http.post(this.ordersUrl, cart).subscribe(
         res => {
             let msg = JSON.parse(res['_body'])['message'];
              // $.toast({
              //     text: msg,
              //      position: 'top-center',
              //      'icon': 'success',
              //     showHideTransition: 'slide',
              // });
              // product.reviews.push(JSON.parse(res['_body']));
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
