import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { OrderService } from '../../services/order.service';

import { CurrencyService } from '../../services/currency.service';
import { ExchangeRateService } from '../../services/exchange-rate.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
   providers: [ OrderService, CurrencyService, ExchangeRateService ]
})
export class CheckoutComponent implements OnInit {
  
  t = localStorage;
   currencys:any[];
   exchange_rates :any[];
  //registered:Boolean=true;
  anonymous:Boolean=true;
  
  loggedIn:Boolean=false;
 
  shipping:Boolean=false;
  
  paid:Boolean=false;

  loginForm:FormGroup;
  product : any = {};
  customer: Object= {};
  error: any;
  constructor(fb: FormBuilder, private orderSrv :OrderService, private currencySrv: CurrencyService,
       private rateSrv: ExchangeRateService) { 
  	
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
   };

   this.fetchCurrencys();
          this.fetchExchangeRates()
          if(!localStorage.getItem('currency')){
            localStorage.setItem('currency', 'GBP');
          }

 
 
  };

  fetchCurrencys(){
    
   this.currencySrv.fetchCurrencys().subscribe(
         data => {
               this.currencys = data.results;

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    });//.then(response => this.currencys = response.results)
  }

fetchExchangeRates(){
    
   this.rateSrv.fetchRates().then(response => {
     
    this.exchange_rates = response.results;
     let selected_currency = this.exchange_rates.find(x =>  x['currency']['code'] == localStorage.getItem('currency'));
     localStorage.setItem('rate', selected_currency.rate);
   });
  
  };

  changeCurrency(evt){
     localStorage.setItem('currency' , evt.target.value);
     let selected_currency = this.exchange_rates.find(x =>  x['currency']['code'] == localStorage.getItem('currency'));
     localStorage.setItem('rate', selected_currency.rate);

 };


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
           let msg = JSON.parse(error._body)['message'];
           this.error = msg;
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
