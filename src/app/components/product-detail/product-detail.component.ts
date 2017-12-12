import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';

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
  providers: [ ProductService]
})
export class ProductDetailComponent implements OnInit {
  
  product: Object= {};
  host_address: string =  this.globals.HOST_URL; 

  constructor(private productSrv :ProductService, private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
      this.route.params.switchMap((params: Params) => 
         this.productSrv.findProductByUUID(params['id']))
       .subscribe(
         data => {
               this.product = data;
              
          
         });
  }

}
