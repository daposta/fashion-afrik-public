import { Component, OnInit } from '@angular/core';
import { ProductTypesService } from '../../services/product-types.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [  CategoryService,  ProductTypesService, ProductService]
})
export class SearchResultsComponent implements OnInit {
  t = localStorage;
  search_results:any[];
  q :any;
  error: any;
  constructor( private route: ActivatedRoute, private productSrv :ProductService) { }

  ngOnInit() {
  	
  	let query = this.route.snapshot.queryParams['q'];
  	this.productSrv.searchProduct(query).subscribe(res =>{
        
      this.search_results = res.results
    }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    })
    //.then(response => this.search_results = response.results);
  	this.q = query;
  	

  	
  }

}
