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
        'addressLine1':['', Validators.required,],
        'addressLine2':['', ],
        'country':['', Validators.required,],
         'city':['', Validators.required,],
        'state':['', Validators.required,],
        'zipCode':['', Validators.required,],
         'name':['', Validators.required,],
      });
   }

  ngOnInit() {
  }

  saveShipping(){
    this.shippingAttempt = true;
    if (this.shippingForm.valid){
      
     //  this.userSrv.register(this.registerUser, this.registerForm);
     }
  }

}
