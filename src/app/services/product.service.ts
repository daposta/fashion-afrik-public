import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {


 private productsUrl = this.globals.PRODUCTS_URL; 
 private productsByStoreUrl = this.globals.PRODUCTS_BY_STORE_URL; 
 private productsByCategoryUrl = this.globals.PRODUCTS_BY_CATEGORY_URL; 

  constructor(private http: Http, private globals: Globals,  private router:Router) { }

  fetchProductsByStore(data: string){

  	console.log('store....'+ data);

  	 return this.http.get(this.productsByStoreUrl + data +'/')
              .toPromise()
              .then(response => response.json())
              //.catch(this.handleError);
    
  }


  fetchProductsByCategory(data: string){

  	
     return this.http.get(this.productsByCategoryUrl + data +'/')
              .toPromise()
              .then(response => response.json())
              //.catch(this.handleError);

  }

}
