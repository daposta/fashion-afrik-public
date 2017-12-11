import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
   providers: [ ProductService]
})
export class CategoryDetailComponent implements OnInit {
  
  products:any[];
  constructor(private productSrv :ProductService, private route: ActivatedRoute) { }

  ngOnInit() {

  	this.route.params.switchMap((params: Params) => 
			 	this.productSrv.fetchProductsByCategory(params['category']))
			 .subscribe(
			 	data => {
               this.products = data;
          
         });
  }

}
