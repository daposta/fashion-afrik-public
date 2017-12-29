import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';

declare var $: any;


@Injectable()
export class ProductService {


 private productsUrl = this.globals.PRODUCTS_URL; 
 private productsByStoreUrl = this.globals.PRODUCTS_BY_STORE_URL; 
 private productsByCategoryUrl = this.globals.PRODUCTS_BY_CATEGORY_URL; 
 private productsClearanceUrl = this.globals.CLEARANCES_URL; 
 private newArrivalsUrl = this.globals.NEW_ARRIVALS_URL; 
 private forHerUrl = this.globals.FOR_HER_URL; 
 private forHimUrl = this.globals.FOR_HIM_URL; 
 private searchUrl = this.globals.SEARCH_URL; 
 private reviewsUrl = this.globals.REVIEWS_URL;

  constructor(private http: Http, private globals: Globals,  private router:Router) { }

  fetchProductsByStore(data: string){

  	 return this.http.get(this.productsByStoreUrl + data +'/')
              .toPromise()
              .then(response => response.json())
              //.catch(this.handleError);
    
  }


  fetchProductsByCategory(x: string, y:string){

  	
     return this.http.get(this.productsByCategoryUrl + x +'/' +y +'/')
              .toPromise()
              .then(response => response.json())
              //.catch(this.handleError);

  }

  findProductByUUID(data: string){
   
     return this.http.get(this.productsUrl + data +'/')
              .toPromise()
              .then(response => response.json())
             // .catch(this.handleError);
  };


   fetchClearance(x: string, y:string){
    
         return this.http.get(this.productsClearanceUrl + x +'/' +y +'/')
                .toPromise()
                .then(response => response.json())
   }

   fetchNewArrivals(){

       return this.http.get(this.newArrivalsUrl )
              .toPromise()
              .then(response => response.json())

   }

   fetchHim(){

       return this.http.get(this.forHimUrl )
              .toPromise()
              .then(response => response.json())

   }

   fetchHer(){

       return this.http.get(this.forHerUrl )
              .toPromise()
              .then(response => response.json())

   }

  searchProduct(data:string){
      
       return this.http.get(this.searchUrl +'?search=' +data )
              .toPromise()
              .then(response => response.json())

   }

   saveNewReview(review:any, product:any){
     
    //  headers.append('Content-Type', 'multipart/form-data');
     let formData = new FormData();
        formData.append("reviewer_email", review['email']);
        formData.append('reviewer_name', review['name']);
        formData.append('comment', review['comment']);
         formData.append('product', review['product']);
     
       

     this.http.post(this.reviewsUrl, formData).subscribe(
         res => {
             let msg = JSON.parse(res['_body'])['message'];
              // $.toast({
              //     text: msg,
              //      position: 'top-center',
              //      'icon': 'success',
              //     showHideTransition: 'slide',
              // });
               product.reviews.push(JSON.parse(res['_body']));
             //this.router.navigateByUrl('products');
         },
         error =>{
        
        let msg = JSON.parse(error._body)['message'];
        // $.toast({
        //     text: msg,
        //      position: 'top-center',
        //      icon: 'error',
        //      showHideTransition: 'slide',
        // });
      })
   }

}
