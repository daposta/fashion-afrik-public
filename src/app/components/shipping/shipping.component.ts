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
  error: any;
  shippingField: Boolean = false;
  private shippingAttempt: boolean;
  @Output() notifyShipping: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  billing_shipping_same: boolean;

  shipping: any;
  billing: any;

  constructor(fb: FormBuilder, private countrySrv: CountryService, private shippingSrv: ShippingService, public currencySrv: CurrencyService, public orderSrv: OrderService, public router: Router) {

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
    }

    console.log(data);

    this.orderSrv.postOrder(data).subscribe(res => {

      console.log(res.data);

      localStorage.setItem('order', JSON.stringify(res.data));
      this.shippingField = true;
      this.notifyShipping.emit(this.shippingField);
    }, err => {

      console.log(err.data);
    })
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.billing = this.shipping;
    }
  }

  fetchRegions(event) {

    this.country = event.target.value;

    this.countrySrv.fetchRegion(this.country).subscribe(res => {

      this.regions = res.data;
    }, err => {

      console.log(err);
    })
  }

}
