import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { ShippingService } from '../../services/shipping.service';
import { CurrencyService } from '../../services/currency.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  providers: [CountryService, ShippingService, CurrencyService, OrderService]

})
export class ShippingComponent implements OnInit {
  t = localStorage;
  shippingForm: FormGroup;
  shippingBillingFormGroup: FormGroup;
  product_cost: number;
  // shipping: Object = {};
  // billing: Object = {};
  order: Object = {};
  countrys: any[];
  country: any = {};
  regions: any[] = [];
  currencys: any[] = [];
  countryCode: number;
  shippingFee: number;
  code: string;
  error: any;
  shippingField: Boolean = false;
  private shippingAttempt: boolean;
  @Output() notifyShipping: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  billing_shipping_same: boolean;

  shipping: any;
  billing: any;

  constructor(fb: FormBuilder, private countrySrv: CountryService, public currencySrv: CurrencyService, public orderSrv: OrderService, public router: Router, public shippingSrv: ShippingService) {

    this.shipping = {};
    this.billing = {};
  }

  ngOnInit() {

    this.loadCountries();
    this.fetchCurrencys();
  }

  numbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  loadCountries() {
    this.countrySrv.fetchCountrys().subscribe(res => {
      this.countrys = res.results;
      console.log(this.countrys);
    }, err => {
      console.log(err);
    })
  }

  fetchCurrencys() {
    this.currencySrv.fetchCurrencys().subscribe(res => {
      this.currencys = res.results;
    }, err => {
      console.log(err);
    })
  }

  saveShipping() {

    let data: any = {};
    let cart: any[] = [];
    let currency: any;

    cart = JSON.parse(localStorage.getItem('cart'));
    currency = localStorage.getItem('currency');

    data = {
      cart: cart,
      shipping: this.shipping,
      billing: this.billing,
      currency: currency,
      shipping_cost: this.shippingFee,
    }

    console.log(data);

    this.orderSrv.postOrder(data).subscribe(res => {

      console.log(res.data);

      localStorage.setItem('order', JSON.stringify(res.data));
      this.shippingField = true;
      this.notifyShipping.emit(this.shippingField);
    }, err => {

      console.log(err);
    })
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.billing = this.shipping;
    }
  }

  fetchRegions(event) {

    this.fetchShippingCost(event);
    
    this.country = event.target.value;
    
    this.countrySrv.fetchRegion(this.country).subscribe(res => {
      
      this.regions = res.data;
    }, err => {

      console.log(err);
    })
  }
  
  fetchShippingCost(event) {

    this.countryCode = event.target.value;

    this.shippingSrv.getShippingRate().subscribe(res => {
      // console.log(res);

      res.data.forEach(item => {

        if (this.countryCode === item['country'].country_code) {

          this.shippingFee = item.amount;

          this.code = item['currency'].code;
          console.log(this.shippingFee);
          console.log(this.code);
        }
      })
    }, err => {
      
      console.log(err);
    })

    // console.log('fetching shipping cost');
  }

}
