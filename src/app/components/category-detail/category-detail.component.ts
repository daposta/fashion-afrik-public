import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTypesService } from '../../services/product-types.service';
import { CategoryService } from '../../services/category.service';

import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';
declare var $: any;

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
   providers: [ ProductService, ProductTypesService, CategoryService]
})
export class CategoryDetailComponent implements OnInit {
  t = localStorage;
  products:any[];
  categorys:any[];
   productTypes:any[];
  host_address: string =  this.globals.HOST_URL;
  category:string;
  productType:string;
  sub:string;
  categoryFilter= [];
 productTypeFilter= [];
  theFilter:Object= {};
  error: any;


  constructor(private productSrv :ProductService,  private productTypeSrv: ProductTypesService,
    private categorySrv:CategoryService,
   private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
    let t = this.route;
    let productFilter= this.theFilter;
    let a  = this;
  	this.route.params.switchMap((params: Params) =>
			 	this.productSrv.fetchProductsByCategory(params['category'], params['productType'], params['sub'] ))
			 .subscribe(
			 	data => {
               this.products = data.results;
               this.productType = t.snapshot.params['productType'];
               this.category = t.snapshot.params['category'];
               this.sub = t.snapshot.params['sub'];
                a.fetchProductTypes( this.category );

         });
       //this.fetchProductTypes();
       this.fetchCategories();

        $(".range-slider").ionRangeSlider({
        'type': 'double',
        onStart: function (data) {
            // console.log("onStart");
        },
        onChange: function (data) {
            // console.log("onChange");


             productFilter['minPrice'] = data['from'];
             productFilter['maxPrice'] = data['to'];

        }
      });

      $('.filter-btn').click(function(e){
        e.preventDefault();
        let button_text = $(this).text();
        // setTimeout(function(){
          $(this).text('Loading ...');
        // },2000);
      })
  }

  addCategoryFilter(e){
    
    let categoryFilter= this.categoryFilter;
    if(e.target.checked){
      categoryFilter.push(e.target.value);
      //remove currency from list
      //this.currencys.remove(e.target.value);

    }
    else{

      let index = categoryFilter.indexOf(e.target.value);
      if(index != -1){
        categoryFilter.splice(index, 1);
      }

    }
    this.theFilter['categorys'] = categoryFilter;

  }

  addProductTypeFilter(event){
    
    let  productTypeFilter= this.productTypeFilter;
    if(event.target.checked){
      productTypeFilter.push(event.target.value);
      //remove currency from list
      //this.currencys.remove(e.target.value);

    }
    else{

      let index = productTypeFilter.indexOf(event.target.value);
      if(index != -1){
        productTypeFilter.splice(index, 1);
      }

    }
    this.theFilter['productTypes'] = productTypeFilter;
 


  }

  applyFilter(){
      // let filters = {};
      // filters['prices'] = this.theFilter;
      // filters['categories'] = this.categoryFilter;
      // filters['productTypes'] = this.productTypeFilter;
      
      this.route.params.switchMap((params: Params) =>
        this.productSrv.fetchProductsByCategory(params['category'], params['productType'], params['sub'], this.theFilter ))
       .subscribe(
         data => {
               this.products = data.results;
              

         });
  }

  fetchProductTypes(pt){
    this.productTypeSrv.fetchProductTypes(pt).subscribe(
         data => {
               this.productTypes = data.results;

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    });//.then(response => this.productTypes = response.results)
  }

  fetchCategories(){
       this.categorySrv.fetchCategories().subscribe(
         data => {
               this.categorys = data.results;

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    });
       //.then(response => this.categorys = response.results)

  }

}
