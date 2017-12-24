import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  loginForm:FormGroup;
  product : any = {};
  constructor(fb: FormBuilder) { 
  	this.loginForm = fb.group({
  			
  			'email':['', Validators.required],
  			'sizes':['', Validators.required],
  			'price':['', Validators.required],
  			'productCategory':['', Validators.required],
       
      });
   }

  ngOnInit() {
  }

}
