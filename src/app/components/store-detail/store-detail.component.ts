import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { ProductTypesService } from '../../services/product-types.service';


import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss'],
   providers: [ ProductService, CategoryService, StoreService, ProductTypesService]
})
export class StoreDetailComponent implements OnInit {
  
  t = localStorage;
  products:any[];
  categorys:any[];
  productTypes:any[];
  store: {};

  constructor(private productSrv :ProductService, private route: ActivatedRoute,
    private categorySrv:CategoryService, private storeSrv: StoreService,  private productTypeSrv: ProductTypesService) { }

  ngOnInit() {
  	this.route.params.switchMap((params: Params) =>
			 	this.productSrv.fetchProductsByStore(params['store']))
			 .subscribe(
			 	data => {
               this.products = data.results;

         });

       this.fetchCategories();
       this.fetchProductTypes();
  }



  fetchCategories(){
       this.categorySrv.fetchCategories().then(response => this.categorys = response.results)

  }

  fetchProductTypes(){
    this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  }

  getStoreInfo(){
    // this.route.params.switchMap((params: Params) =>
    //      this.storeSrv.getStore(params['store']))
    //    .subscribe(
    //      data => {
    //            this.store = data;

    //      });

  }


 searchInStore(){

 }
}
