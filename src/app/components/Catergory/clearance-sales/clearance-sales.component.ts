import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../../shared/api';
import { ProductService } from '../services/product.service';
import { ProductTypesService } from '../services/product-types.service';
import { CategoryService } from '../services/category.service';
declare var $: any;

@Component({
  selector: 'app-clearance-sales',
  templateUrl: './clearance-sales.component.html',
  styleUrls: ['./clearance-sales.component.scss'],
  providers: [ProductService, ProductTypesService, CategoryService]
})
export class ClearanceSalesComponent implements OnInit {
  //products:any[];
  t = localStorage;
  products: any[];
  categorys: any[];
  productTypes: any[];
  host_address: string = this.globals.HOST_URL;
  category: string;
  productType: string;
  sales: any[];

  sub: string;
  categoryFilter = [];
  productTypeFilter = [];
  theFilter: Object = {};
  error: any;
  constructor(private productSrv: ProductService, private productTypeSrv: ProductTypesService,
    private categorySrv: CategoryService, private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
    //this.fetchClearance();
    let t = this.route;
    let productFilter = this.theFilter;
    let category = this.category;
    let a = this
    this.route.params.switchMap((params: Params) =>
      this.productSrv.fetchClearance(params['category'], params['productType'], params['sub']))
      .subscribe(
        data => {
          this.sales = data;
          this.category = t.snapshot.params['category'];
          this.productType = t.snapshot.params['productType'];
          this.sub = t.snapshot.params['sub'];
          console.log(this.category, this.productType, this.sub);
          console.log(this.sales);
          a.fetchProductTypes(this.category);

        });

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

    $('.filter-btn').click(function (e) {
      e.preventDefault();
      let button_text = $(this).text();
      // setTimeout(function(){
      $(this).text('Loading ...');
      // },2000);
    })
  }




  addCategoryFilter(e) {

    let categoryFilter = this.categoryFilter;
    if (e.target.checked) {
      categoryFilter.push(e.target.value);
      //remove currency from list
      //this.currencys.remove(e.target.value);

    }
    else {

      let index = categoryFilter.indexOf(e.target.value);
      if (index != -1) {
        categoryFilter.splice(index, 1);
      }

    }
    this.theFilter['categorys'] = categoryFilter;

  }

  addProductTypeFilter(event) {

    let productTypeFilter = this.productTypeFilter;
    if (event.target.checked) {
      productTypeFilter.push(event.target.value);
      //remove currency from list
      //this.currencys.remove(e.target.value);

    }
    else {

      let index = productTypeFilter.indexOf(event.target.value);
      if (index != -1) {
        productTypeFilter.splice(index, 1);
      }

    }
    this.theFilter['productTypes'] = productTypeFilter;



  }

  applyFilter() {
    // let filters = {};
    // filters['prices'] = this.theFilter;
    // filters['categories'] = this.categoryFilter;
    // filters['productTypes'] = this.productTypeFilter;

    this.route.params.switchMap((params: Params) =>
      this.productSrv.fetchClearance(params['category'], params['productType'], params['sub'], this.theFilter))
      .subscribe(
        res => {
          this.products = res;
          console.log(this.products);
        }, err => {
          console.log(err);
        });
  }

  fetchProductTypes(pt) {
    this.productTypeSrv.fetchProductTypes(pt).subscribe(
      data => {
        this.productTypes = data;
      }, err => {
        console.log(err);
      });
  }

  fetchCategories() {

    this.categorySrv.fetchCategories().subscribe(
      data => {
        this.categorys = data.results;

      }, error => {

        let msg = JSON.parse(error._body)['message'];

        this.error = msg;

      });
    //.then(response => this.categorys = response.results)

  }

}
