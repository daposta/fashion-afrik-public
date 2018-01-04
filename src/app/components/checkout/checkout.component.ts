import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  

  registered:Boolean=true;
  loggedIn:Boolean=true;
  shipping:Boolean=true;
  paid:Boolean=true;

  loginForm:FormGroup;
  product : any = {};
  constructor(fb: FormBuilder) { 
  	// this.loginForm = fb.group({
  			
  	// 		'email':['', Validators.required],
  	// 		'sizes':['', Validators.required],
  	// 		'price':['', Validators.required],
  	// 		'productCategory':['', Validators.required],
       
   //    });
   }

  ngOnInit() {


  }

  saveOrder(){
     //if user is logged in, save cart as order in db
  }



  

}
