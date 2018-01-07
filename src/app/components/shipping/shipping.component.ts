import { Component, OnInit ,  Output, EventEmitter} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  providers: [ CountryService, ShippingService]

})
export class ShippingComponent implements OnInit {
  
  shippingForm:FormGroup;
  shipping: Object= {};
  countrys:any[];
  shippingField: Boolean=false;
  private shippingAttempt: boolean;
    @Output() notifyShipping: EventEmitter<Boolean> = new EventEmitter<Boolean>();


  constructor(fb: FormBuilder,  private countrySrv :CountryService, private shippingSrv: ShippingService) {
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
      
       this.shippingSrv.saveShippingInfo(this.shipping).subscribe(shipping=>{
         
            if(!localStorage.getItem('checkout')){
                localStorage.setItem('checkout',JSON.stringify({}));   
              }
              let data = JSON.parse(localStorage.getItem('checkout'));
              data['shipping'] = shipping.id
              // let checkout = {"shipping": shipping.id};
              localStorage.setItem('checkout',JSON.stringify(data));
             this.shippingField = true;
             this.notifyShipping.emit(this.shippingField);
             console.log(this.shippingField);



        },  error=>{

        });
    
     }
  }

}
