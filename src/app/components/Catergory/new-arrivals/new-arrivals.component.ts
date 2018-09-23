import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductTypesService } from '../services/product-types.service';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
  providers: [ProductService, ProductTypesService, CategoryService]
})
export class NewArrivalsComponent implements OnInit {

  t = localStorage;
  arrivals: any[];
  products: any[];
  categorys: any[];
  productTypes: any[];
  sales: any[];

  category: string;
  productType: string;
  sub: string;
  categoryFilter = [];
  productTypeFilter = [];
  theFilter: Object = {};
  error: any;
  constructor(private productSrv: ProductService, private productTypeSrv: ProductTypesService,
    private categorySrv: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.productSrv.fetchNewArrivals().then(response => this.arrivals = response.results)
    let t = this.route;
    let productFilter = this.theFilter;
    let category = this.category;
    let a = this
    this.route.params.switchMap((params: Params) =>
      this.productSrv.fetchClearance(params['category'], params['productType'], params['sub']))
      .subscribe(
        res => {
          this.arrivals = res;
          this.category = t.snapshot.params['category'];
          this.productType = t.snapshot.params['productType'];
          this.sub = t.snapshot.params['sub'];

          a.fetchProductTypes(this.category);
        }, err => {
          console.log(err);
        });

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
  };

  fetchProductTypes(pt) {
    this.productTypeSrv.fetchProductTypes(pt).subscribe(
      res => {
        this.productTypes = res;

      }, err => {
        console.log(err);
      });
  }

  fetchCategories() {

    this.categorySrv.fetchCategories().subscribe(
      res => {
        this.categorys = res;
        
      }, err => {
        console.log(err);
      });
  }

}
