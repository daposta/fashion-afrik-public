import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service'

import { CurrencyService } from '../../services/currency.service';
import { ExchangeRateService } from '../../services/exchange-rate.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [OrderService, CurrencyService, ExchangeRateService, UserService]
})
export class CheckoutComponent implements OnInit {

  t = localStorage;
  currencys: any[];
  exchange_rates: any[];
  //registered:Boolean=true;
  anonymous: Boolean = true;

  loggedIn: Boolean = false;

  shipping: Boolean = false;

  paid: Boolean = false;

  loginForm: FormGroup;
  loginUser: Object = {};
  loginAttempt: boolean;
  loading: boolean;
  product: any = {};
  customer: Object = {};
  order: any;
  @Output() notifyLogin: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  error: any;
  constructor(fb: FormBuilder, private orderSrv: OrderService, private currencySrv: CurrencyService,
    private rateSrv: ExchangeRateService, private userSrv: UserService, private router: Router) {

    this.loginForm = fb.group({
      'email': ['', Validators.required,],
      'password': ['', Validators.required],
    });
  }

  ngOnInit() {

    if (localStorage.getItem('customer')) {

      this.loggedIn = true;
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
      localStorage.setItem('rate', selected_currency.rate);

    }, err => {
      console.log(err);
    })
  }

  changeCurrency(evt) {
    localStorage.setItem('currency', evt.target.value);
    let selected_currency = this.exchange_rates.find(x => x['currency']['code'] == localStorage.getItem('currency'));
    localStorage.setItem('rate', selected_currency.rate);

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

        if (res) {

          localStorage.setItem('token', res.data.token);
          localStorage.setItem('customer', JSON.stringify(res.data.user));
          this.customer = res.data.user;
          this.loggedIn = true;
          this.notifyLogin.emit(this.loggedIn);
        }
        this.loading = false;
      }, err => {

        console.log(err);
        this.loading = false;
      });
      this.loading = false;
    }
  }
}
