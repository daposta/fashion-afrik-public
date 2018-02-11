import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTypesService } from '../../services/product-types.service';
import { CategoryService } from '../../services/category.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
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

  products:any[];
  categorys:any[];
   productTypes:any[];
  host_address: string =  this.globals.HOST_URL;
  category:string;
  productType:string;
  categoryFilter= []
 productTypeFilter= []
  theFilter:Object= {}


  constructor(private productSrv :ProductService,  private productTypeSrv: ProductTypesService,
    private categorySrv:CategoryService,
   private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
    let t = this.route;
    let productFilter= this.theFilter;
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

        $(".range-slider").ionRangeSlider({
        'type': 'double',
        onStart: function (data) {
            console.log("onStart");
        },
        onChange: function (data) {
            console.log("onChange");


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

  addProductTypeFilter(e){

    let  productTypeFilter= this.productTypeFilter;
    if(e.target.checked){
      productTypeFilter.push(e.target.value);
      //remove currency from list
      //this.currencys.remove(e.target.value);

    }
    else{

      let index = productTypeFilter.indexOf(e.target.value);
      if(index != -1){
        productTypeFilter.splice(index, 1);
      }

    }
    this.theFilter['productTypes'] = productTypeFilter;


  }

  fetchProductTypes(){
    this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  }

  fetchCategories(){
       this.categorySrv.fetchCategories().then(response => this.categorys = response.results)

  }

}
