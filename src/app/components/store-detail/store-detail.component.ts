import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss'],
   providers: [ ProductService]
})
export class StoreDetailComponent implements OnInit {
  
  products:any[];

  constructor(private productSrv :ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.switchMap((params: Params) => 
			 	this.productSrv.fetchProductsByStore(params['store']))
			 .subscribe(
			 	data => {
               this.products = data.results;
          
         });
  }

}
