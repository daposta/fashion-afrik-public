import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  providers: [ CountryService]

})
export class ShippingComponent implements OnInit {
  
  shippingForm:FormGroup;
  shipping: Object= {};
  countrys:any[];
  private shippingAttempt: boolean;

  constructor(fb: FormBuilder,  private countrySrv :CountryService) {
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
    this.loadCountries();
  }

  loadCountries(){
    this.countrySrv.fetchCountrys().then(response => this.countrys = response.results)
  }

  saveShipping(){
    this.shippingAttempt = true;
    if (this.shippingForm.valid){
      
     //  this.userSrv.register(this.registerUser, this.registerForm);
     }
  }

}
