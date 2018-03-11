import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTypesService } from '../../services/product-types.service';
import { CategoryService } from '../../services/category.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
  providers: [ ProductService, ProductTypesService, CategoryService]
})
export class NewArrivalsComponent implements OnInit {
  
  t = localStorage;
  arrivals:any[];
  products:any[];
  categorys:any[];
   productTypes:any[];
  //host_address: string =  this.globals.HOST_URL; 
   sales:any[];
 
  category:string;
  productType:string;
  sub:string;
  categoryFilter= [];
 productTypeFilter= [];
  theFilter:Object= {};
  error: any;
  constructor(private productSrv :ProductService, private productTypeSrv: ProductTypesService,
    private categorySrv:CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
  	 //this.productSrv.fetchNewArrivals().then(response => this.arrivals = response.results)
        let t = this.route;
    let productFilter= this.theFilter;
    let category = this.category;
    let a = this
    this.route.params.switchMap((params: Params) => 
         this.productSrv.fetchClearance(params['category'], params['productType'], params['sub'] ))
       .subscribe(
         data => {
               this.sales = data.results;
               this.category = t.snapshot.params['category'];
               this.productType = t.snapshot.params['productType'];
               this.sub = t.snapshot.params['sub'];

               a.fetchProductTypes( this.category );
          
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

      $('.filter-btn').click(function(e){
        e.preventDefault();
        let button_text = $(this).text();
        // setTimeout(function(){
          $(this).text('Loading ...');
        // },2000);
      })
  };

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
