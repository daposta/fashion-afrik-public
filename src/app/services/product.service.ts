import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

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

  constructor(private http: Http, private globals: Globals) { }

  fetchProductsByStore(data: string){

  	 return this.http.get(this.productsByStoreUrl + data +'/')
             .map(this.extractData)
        .catch(this.handleErrorObservable);
    
  }


  fetchProductsByCategory(x: string, y:string, z:string, a?:{}){
    let productTypes='';
    if(a && a['productTypes']){
      productTypes = a['productTypes'];
    };
    let min_price='';
    let max_price = '';
    if(a && a['minPrice'] && a['maxPrice']){
      min_price = a['minPrice'];
      max_price = a['maxPrice'];
    };
  	
     return this.http.get(this.productsByCategoryUrl + x +'/' +y +'/' +z +'/' +'?&productTypes=' + productTypes
        + '&min_price=' + min_price + '&max_price=' + max_price)
               .map(this.extractData)
                .catch(this.handleErrorObservable);

  }

  findProductByUUID(data: string){
   
     return this.http.get(this.productsUrl + data +'/')
              .toPromise()
              .then(response => response.json())
  };


   fetchClearance(x: string, y:string, z:string, a?:{}){
        let productTypes='';
    if(a && a['productTypes']){
      productTypes = a['productTypes'];
    }
    let min_price='';
    let max_price = ''
    if(a && a['minPrice'] && a['maxPrice']){
      min_price = a['minPrice'];
      max_price = a['maxPrice'];
    }
    return this.http.get(this.productsClearanceUrl + x +'/' +y +'/'  +z +'/' +'?&productTypes=' + productTypes
        + '&min_price=' + min_price + '&max_price=' + max_price)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
              

   }

   fetchNewArrivals(){

       return this.http.get(this.newArrivalsUrl )
              .toPromise()
              .then(response => response.json())
              .catch(this.handleErrorObservable);


   }

   fetchHim(){

       return this.http.get(this.forHimUrl )
              .toPromise()
              .then(response => response.json())
              .catch(this.handleErrorObservable);


   }

   fetchHer(){

       return this.http.get(this.forHerUrl )
          .map(this.extractData)
        .catch(this.handleErrorObservable);
              // .toPromise()
              // .then(response => response.json())
              //  .catch(this.handleErrorObservable);


   }

  searchProduct(data:string){
      
       return this.http.get(this.searchUrl +'?search=' +data )
              .map(this.extractData)
          .catch(this.handleErrorObservable);

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
             
               product.reviews.push(JSON.parse(res['_body']));
             //this.router.navigateByUrl('products');
         },
         error =>{
        
        let msg = JSON.parse(error._body)['message'];
       
      })
   }

    private extractData(res: Response) {
        let body =  res.json();
        return body || {};
    }


    private handleErrorObservable (error: Response | any) {
      return Observable.throw(error.message || error);
    }

}
