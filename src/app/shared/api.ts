
import { Injectable } from '@angular/core';

Injectable()
export class Globals{
	HOST_URL =  'http://127.0.0.1:8000';//   'http://139.162.248.210:8004';  //  
	LOGIN_URL =  this.HOST_URL + '/stores/api/login/';
    LOGOUT_URL = this.HOST_URL + '/stores/api/logout/';
    CATEGORYS_URL =  this.HOST_URL + '/customers/api/categorys/';
    PRODUCTS_URL =  this.HOST_URL + '/customers/api/products/';
    STORES_URL =  this.HOST_URL + '/customers/api/stores/';
    ORDERS_URL =  this.HOST_URL + '/customers/api/orders/';
    REGISTER_URL =  this.HOST_URL + '/customers/api/register/';
    PRODUCTS_BY_STORE_URL =  this.HOST_URL + '/customers/api/store/';
    PRODUCTS_BY_CATEGORY_URL =  this.HOST_URL + '/customers/api/category/';
    CURRENT_PROFILE_URL = this.HOST_URL + '/stores/api/me/'; //current_profile
  
    ACCOUNT_ACTIVATION_URL =  this.HOST_URL + '/stores/api/activate/';

    CLEARANCES_URL =  this.HOST_URL + '/customers/api/new_arrivals/';
    NEW_ARRIVALS_URL =  this.HOST_URL + '/customers/api/clearance/';

    
}
