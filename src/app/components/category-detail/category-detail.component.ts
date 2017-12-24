import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTypesService } from '../../services/product-types.service';
import { CategoryService } from '../../services/category.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
   providers: [ ProductService, ProductTypesService, CategoryService]
})
export class CategoryDetailComponent implements OnInit {
  
  products:any[];
  categorys:any[];
   productTypes:any[];
  host_address: string =  this.globals.HOST_URL; 
  category:string;
  productType:string;
  constructor(private productSrv :ProductService,  private productTypeSrv: ProductTypesService,
    private categorySrv:CategoryService,
   private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
    let t = this.route;
  	this.route.params.switchMap((params: Params) => 
			 	this.productSrv.fetchProductsByCategory(params['category'], params['productType'] ))
			 .subscribe(
			 	data => {
               this.products = data.results;
               this.category = t.snapshot.params['category'];
               this.productType = t.snapshot.params['productType'];
          
         });
       this.fetchProductTypes();
       this.fetchCategories();
  }

  fetchProductTypes(){
    this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  }

  fetchCategories(){
       this.categorySrv.fetchCategories().then(response => this.categorys = response.results)

  }

}
