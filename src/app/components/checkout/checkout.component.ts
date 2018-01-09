import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
   providers: [ OrderService,]
})
export class CheckoutComponent implements OnInit {
  

  //registered:Boolean=true;
  anonymous:Boolean=true;
  
  loggedIn:Boolean=false;
 
  shipping:Boolean=false;
  
  paid:Boolean=false;

  loginForm:FormGroup;
  product : any = {};
  customer: Object= {};
  constructor(fb: FormBuilder, private orderSrv :OrderService,) { 
  	
   }

  ngOnInit() {
  // localStorage.removeItem('customer');
     // localStorage.removeItem('cart');
    //  localStorage.removeItem('auth_token');
    // localStorage.removeItem('checkout');
   
   
   if(localStorage.getItem('customer')){
     this.loggedIn = true;
     this.anonymous = false;
     this.customer = JSON.parse(localStorage.getItem('customer'));
     //create order
     let order = JSON.parse(localStorage.getItem('cart'));
     if(order){
        this.saveOrder(order)
   
     }
   
     
   }
  
   if(localStorage.getItem('checkout')){
     let checkout = JSON.parse(localStorage.getItem('checkout'));
     if(checkout['shipping']){
       this.shipping = true;
     }
     if(checkout['paid']){
       this.paid = true;
       localStorage.removeItem('checkout');
       location.href= '/';
     }
   }

 
 
  }


  saveOrder(order){
    this.orderSrv.saveOrder(order).subscribe(order=>{
         
            localStorage.removeItem('cart');
            if(!localStorage.getItem('checkout')){
                localStorage.setItem('checkout',JSON.stringify({}));   
              }
              let checkout = JSON.parse(localStorage.getItem('checkout'));
              checkout['order'] =  order;
              localStorage.setItem('checkout',JSON.stringify(checkout));



        },  error=>{

        });
  }


   userLoggedIn(_loggedIn:Boolean){

     this.loggedIn = _loggedIn;
     this.customer = JSON.parse(localStorage.getItem('customer'));
     
     let order = JSON.parse(localStorage.getItem('cart'));
     if(order){
        this.saveOrder(order)
   
     }


   }

   orderShippingFilled(shippingField:Boolean){
    
     this.shipping = shippingField;
   }

 paymentComplete(_paid:Boolean){
   this.paid = _paid;
 }
   
  



  

}
