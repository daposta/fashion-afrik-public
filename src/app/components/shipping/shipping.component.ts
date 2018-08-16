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

  isShipping: boolean = false;
  isPickup: boolean = false;
  selectedLink: string;

  shipping: any;
  billing: any;
  pickup_country: any;
  pickup_region: any;
  pickup_address: any;
  address: any;

  constructor(fb: FormBuilder,
    private countrySrv: CountryService,
    public currencySrv: CurrencyService,
    public orderSrv: OrderService,
    public router: Router,
    public shippingSrv: ShippingService) {

    this.shipping = {};
    this.billing = {};

    this.selectedLink = 'shipping';

  }

  ngOnInit() {

    this.loadCountries();
    this.fetchCurrencys();
  }

  setRadio(e: string): void {
    this.selectedLink = e;
  }

  isSelected(name: string): boolean {
    if (!this.selectedLink) {
      return false;
    }
    return (this.selectedLink === name);
  }

  numbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  loadCountries() {
    this.countrySrv.fetchCountrys().subscribe(res => {
      this.countrys = res.results;
      // console.log(this.countrys);
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

    // console.log(data);

    this.orderSrv.postOrder(data).subscribe(res => {

      // console.log(res.data);

      localStorage.setItem('order', JSON.stringify(res.data));
      this.shippingField = true;
      this.notifyShipping.emit(this.shippingField);
    }, err => {

      console.log(err);
    })
  }

  savePickup() {
    let data: any = {};
    let cart: any[] = [];
    let currency: any;

    cart = JSON.parse(localStorage.getItem('cart'));
    currency = localStorage.getItem('currency');

    data = {
      cart: cart,
      pickup_point: this.address.id,
      currency: currency,
      shipping_cost: 0.00,
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

  fetchPickupPoints(event) {
    const region = event.target.value;
    const country = this.country;

    this.countrySrv.fetchPickupPoints(country, region).subscribe((res) => {

      console.log(res.data);

      this.pickup_address = res.data;
    }, (err) => {

      console.log(err);
    })
  }

  showAddress(event) {
    const city = event.target.value;

    this.pickup_address.forEach(item => {
      if (city === item['city'].slug) {
        this.address = item;

        console.log(this.address);
      }
    })
  }

  fetchRegions(event) {

    this.fetchShippingCost(event);
    this.country = event.target.value;
    this.countrySrv.fetchRegion(this.country).subscribe(res => {
      this.regions = res.data;
    }, err => {

      console.log(err);
    })
  };
  fetchShippingCost(event) {

    this.countryCode = event.target.value;

    this.shippingSrv.getShippingRate().subscribe(res => {
      // console.log(res);

      res.data.forEach(item => {

        if (this.countryCode === item['country'].country_code) {

          this.shippingFee = item.amount;

          this.code = item['currency'].code;
          // console.log(this.shippingFee);
          // console.log(this.code);
        }
      })
    }, err => {
      console.log(err);
    })
  }

}
