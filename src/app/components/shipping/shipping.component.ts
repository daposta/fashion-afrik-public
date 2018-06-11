import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  providers: [CountryService, ShippingService]

})
export class ShippingComponent implements OnInit {
  t = localStorage;
  shippingForm: FormGroup;
  product_cost: number;
  shipping: Object = {};
  order: Object = {};
  countrys: any[];
  error: any;
  shippingField: Boolean = false;
  private shippingAttempt: boolean;
  @Output() notifyShipping: EventEmitter<Boolean> = new EventEmitter<Boolean>();


  constructor(fb: FormBuilder, private countrySrv: CountryService, private shippingSrv: ShippingService) {
    this.shippingForm = fb.group({
      'addressLine1': ['', Validators.required,],
      'addressLine2': ['',],
      'country': ['', Validators.required,],
      'city': ['', Validators.required,],
      'state': ['', Validators.required,],
      'zipCode': ['', Validators.required,],
      'name': ['', Validators.required,],
    });
  }

  ngOnInit() {
    this.loadCountries();
    if (localStorage.getItem('checkout')) {
      this.order = JSON.parse(localStorage.getItem('checkout'))['cart'];
      this.product_cost = this.order['total_cost'];
    }
    // console.log(this.order);
    // console.log(this.product_cost);
    // console.log(localStorage.getItem('checkout')['order']);


  }

  loadCountries() {
    this.countrySrv.fetchCountrys().subscribe(res => {
      this.countrys = res
    }, err => {
      console.log(err);
    })
  }

  saveShipping() {
    this.shippingAttempt = true;

    if (this.shippingForm.valid) {

      this.shippingSrv.saveShippingInfo(this.shipping).subscribe(shipping => {

        if (!localStorage.getItem('checkout')) {
          localStorage.setItem('checkout', JSON.stringify({}));
        }
        let data = JSON.parse(localStorage.getItem('checkout'));
        data['shipping'] = shipping.id
        localStorage.setItem('checkout', JSON.stringify(data));
        this.shippingField = true;
        this.notifyShipping.emit(this.shippingField);



      }, error => {

      });

    }
  }

}
