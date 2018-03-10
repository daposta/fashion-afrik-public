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
  storeParam: string;
  store: Object= {};
  //storeInfo:
    error: any;


  constructor(private productSrv :ProductService, private route: ActivatedRoute,
    private categorySrv:CategoryService, private storeSrv: StoreService,  private productTypeSrv: ProductTypesService) { }

  ngOnInit() {
    let t = this.route;
  	this.route.params.switchMap((params: Params) =>
			 	this.productSrv.fetchProductsByStore(params['store']))
			 .subscribe(
			 	data => {
               this.products = data.results;
               this.storeParam =  t.snapshot.params['store'];
                this.getStore(this.storeParam);

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
       
        
    });

       this.fetchCategories();
       this.fetchProductTypes();
  }

  getStore(_store){
       this.storeSrv.fetchStores(_store).subscribe(
         data => {
               this.store = data.results[0];

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    });

  }

  fetchCategories(){
       this.categorySrv.fetchCategories().subscribe(
         data => {
               this.categorys = data.results;

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    });

  }

  fetchProductTypes(){
    this.productTypeSrv.fetchProductTypes().subscribe(
         data => {
               this.productTypes = data.results;

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    });//.then(response => this.productTypes = response.results)
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
