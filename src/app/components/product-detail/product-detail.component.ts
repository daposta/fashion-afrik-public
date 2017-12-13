import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import {FormBuilder,FormGroup, Validators} from '@angular/forms'

import {Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';
// import * as $ from 'jquery';
declare var $: any;

// import  'slick-carousel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ ProductService, CartService]
})
export class ProductDetailComponent implements OnInit {
  
  product: Object= {};
  host_address: string =  this.globals.HOST_URL; 
  productItem: Object= {};
  cartForm:FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private productSrv :ProductService, private route: ActivatedRoute, private globals: Globals,
    private cartSrv: CartService, fb: FormBuilder) { 
      this.cartForm = fb.group({
        'qty':['', Validators.required],
      });
  }

  ngOnInit() {

$(function(){
    $('.responsive').slick({
       dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5
        });
  });

      this.route.params.switchMap((params: Params) => 
         this.productSrv.findProductByUUID(params['id']))
       .subscribe(
         data => {
               this.product = data;
              
          
         });
  }


  addToCart(){
      this.formSubmitAttempt = true;
     if(this.cartForm.valid  && this.product){
        let data = {'product':this.product, 'qty':this.productItem['qty'] } 
      
        this.cartSrv.addToCart(data);
     }
     
  }

}
