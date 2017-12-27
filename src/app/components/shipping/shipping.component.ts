import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  
  shippingForm:FormGroup;
  shipping: Object= {};
  private shippingAttempt: boolean;

  constructor(fb: FormBuilder) {
  	 this.shippingForm = fb.group({
        'address1':['', Validators.required,],
        'address2':['', ],
      });
   }

  ngOnInit() {
  }

  saveShipping(){

  }

}
