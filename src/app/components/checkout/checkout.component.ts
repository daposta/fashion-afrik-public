import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service'

import { CurrencyService } from '../../services/currency.service';
import { ExchangeRateService } from '../../services/exchange-rate.service';

declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [OrderService, CurrencyService, ExchangeRateService, UserService]
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  loginView: boolean = true;
  anonymous: Boolean = true;
  registerView: boolean = false;
  loggedIn: Boolean = false;
  shipping: Boolean = false;
  paid: Boolean = false;
  not_customer: boolean = false;
  loginAttempt: boolean = false;
  registerAttempt: boolean = false;
  loading: boolean = false;

  loginForm: FormGroup;
  registerForm: FormGroup;

  loginUser: Object = {};
  registerUser: Object = {};
  customer: Object = {};

  currencys: any[];
  exchange_rates: any[];
  product: any = {};
  t = localStorage;
  order: any;
  error: any;

  @Output() notifyLogin: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  
  constructor(fb: FormBuilder, private orderSrv: OrderService, private currencySrv: CurrencyService,
    private rateSrv: ExchangeRateService, private userSrv: UserService, private router: Router) {

    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
    
    this.registerForm = fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'email': ['', Validators.required,],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
      'mobile': ['', Validators.required],
    }, { validator: this.checkPasswords }
  )}

  checkPasswords(group: FormGroup) {

    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit() {

    if (localStorage.getItem('customer')) {

      this.loggedIn = true;
      this.loginView = false;
      this.anonymous = false;
      this.customer = JSON.parse(localStorage.getItem('customer'));
      this.order = JSON.parse(localStorage.getItem('order'));
    }

    if (localStorage.getItem('order')) {
      let order = JSON.parse(localStorage.getItem('checkout'));
      if (order) {
        this.shipping = true;
      }
      // if (checkout['paid']) {
      //   this.paid = true;
      //   localStorage.removeItem('checkout');
      //   location.href = '/';
      // }
    };

    this.fetchCurrencys();
    this.fetchExchangeRates()
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'GBP');
    }
  };

  ngAfterViewInit() {
    $("[type=tel]").intlTelInput({
      autoplaceholder: 'aggressive'
    });
  }

  toRegister() {
    this.loginView = false;
    this.registerView = true;
    this.ngOnInit();
  }

  toLogin() {
    this.registerView = false;
    this.loginView = true;
    this.ngOnInit();
  }

  fetchCurrencys() {

    this.currencySrv.fetchCurrencys().subscribe(
      res => {
        this.currencys = res;

      }, err => {
        console.log(err);
      });
  }

  fetchExchangeRates() {
    this.rateSrv.fetchRates().subscribe((res: any) => {
      this.exchange_rates = res.results;
      let selected_currency = this.exchange_rates.find(x => x['currency']['code'] == localStorage.getItem('currency'));
      //localStorage.setItem('rate', selected_currency.rate);
       if(this.product && this.product['currency  ']){
          if (!(this.product['currency']['code']== selected_currency['currency']['code'])){
             
      
            localStorage.setItem('rate', selected_currency['rate']);
         }else{
             localStorage.setItem('rate', String(1) );
         }
        
      }

    }, err => {
      console.log(err);
    })
  }

  changeCurrency(evt) {
    localStorage.setItem('currency', evt.target.value);
    let selected_currency = this.exchange_rates.find(x => x['currency']['code'] == localStorage.getItem('currency'));
    //localStorage.setItem('rate', selected_currency.rate);
    if (!(this.product['currency']['code']== selected_currency['currency']['code'])){

        localStorage.setItem('rate', selected_currency['rate']);
     }else{
         localStorage.setItem('rate', String(1) );
     }

  };

  userLoggedIn(_loggedIn: Boolean) {

    this.loggedIn = _loggedIn;
    console.log(this.loggedIn);
    this.customer = JSON.parse(localStorage.getItem('customer'));
  }

  orderShippingFilled(_shippingField: Boolean) {

    this.shipping = _shippingField;
  }

  paymentComplete(_paid: Boolean) {
    
    this.paid = _paid;
  }

  login() {
    this.loginAttempt = true;
    this.loading = true;
    if (this.loginForm.valid) {

      this.userSrv.login(this.loginUser).subscribe(res => {

        if (res.data.user.is_customer === true) {

          localStorage.setItem('token', res.data.token);
          localStorage.setItem('customer', JSON.stringify(res.data.user));
          this.customer = res.data.user;
          this.loggedIn = true;
          this.notifyLogin.emit(this.loggedIn);
          this.loading = false;
        } else {

          this.not_customer = true;
        }
      }, err => {
        this.notifyLogin.emit(this.loggedIn);

        console.log(err);
        this.loading = false;
      });
      this.loading = false;
    }
  }

  register() {

    this.registerAttempt = true;
    if (this.registerForm.valid) {

      this.loading = true;

      this.userSrv.register(this.registerForm.value)
        .subscribe(res => {

          if (res.data.user.is_customer === true) {

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('customer', JSON.stringify(res.data.user));
            this.customer = res.data.user;
            this.loggedIn = true;
            this.notifyLogin.emit(this.loggedIn);
            this.loading = false;
          } else {
  
            this.not_customer = true;
          }
        }, err => {
          this.notifyLogin.emit(this.loggedIn);

          console.log(err)
          this.loading = false;
        });
      this.loading = false;
    };
  }
}
