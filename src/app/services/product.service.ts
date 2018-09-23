import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

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

  fetchProductsByStore(data: string) {

    return this.http.get(this.productsByStoreUrl + data + '/')
      .map(this.extractData)
      .catch(this.handleErrorObservable);

  }


  fetchProductsByCategory(x: string, y: string, z: string, a?: {}) {
    let productTypes = '';
    if (a && a['productTypes']) {
      productTypes = a['productTypes'];
    };
    let min_price = '';
    let max_price = '';
    if (a && a['minPrice'] && a['maxPrice']) {
      min_price = a['minPrice'];
      max_price = a['maxPrice'];
    };

    return this.http.get(this.productsByCategoryUrl + x + '/' + y + '/' + z + '/' + '?&productTypes=' + productTypes
      + '&min_price=' + min_price + '&max_price=' + max_price)
      .map(this.extractData)
      .catch(this.handleErrorObservable);

  }

  findProductByUUID(data: string) {

    return this.http.get(this.productsUrl + data + '/')
      .toPromise()
      .then(response => response.json())
  };


  fetchClearance(x: string, y: string, z: string, a?: {}) {
    let productTypes = '';
    if (a && a['productTypes']) {
      productTypes = a['productTypes'];
    }
    let min_price = '';
    let max_price = ''
    if (a && a['minPrice'] && a['maxPrice']) {
      min_price = a['minPrice'];
      max_price = a['maxPrice'];
    }
    return this.http.get(this.productsClearanceUrl + x + '/' + y + '/' + z + '/' + '?&productTypes=' + productTypes
      + '&min_price=' + min_price + '&max_price=' + max_price)
      .map(this.extractData)
      .catch(this.handleErrorObservable);


  }

  fetchNewArrivals() {

    return this.http.get(this.newArrivalsUrl)
      .map(this.extractData)
      .catch(this.handleErrorObservable);


  }

  fetchHim() {

    return this.http.get(this.forHimUrl)
      .map(this.extractData)
      .catch(this.handleErrorObservable);


  }

  fetchHer() {

    return this.http.get(this.forHerUrl)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  searchProduct(data: string) {
    console.log(this.searchUrl + '?q=' + data);
    return this.http.get(this.searchUrl + '?q=' + data)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  saveNewReview(review: any) {

    //  headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('reviewer_email', review['email']);
    formData.append('reviewer_name', review['name']);
    formData.append('comment', review['comment']);
    formData.append('product', review['product']);



    return this.http.post(this.reviewsUrl, formData).map(this.extractData)
      .catch(this.handleErrorObservable);

  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


  private handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
  }

}
