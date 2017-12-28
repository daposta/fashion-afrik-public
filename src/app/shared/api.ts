
import { Injectable } from '@angular/core';

Injectable()
export class Globals{
	HOST_URL = 'https://vogueafriq.com/api'; //    'http://127.0.0.1:8000';//  
	LOGIN_URL =  this.HOST_URL + '/stores/api/login/';
    LOGOUT_URL = this.HOST_URL + '/stores/api/logout/';
    CATEGORYS_URL =  this.HOST_URL + '/customers/api/categorys/';
    PRODUCTS_URL =  this.HOST_URL + '/customers/api/products/';
    STORES_URL =  this.HOST_URL + '/customers/api/stores/';
    ORDERS_URL =  this.HOST_URL + '/customers/api/orders/';
    REGISTER_URL =  this.HOST_URL + '/customers/api/register/';
    PRODUCTS_BY_STORE_URL =  this.HOST_URL + '/customers/api/store/';
    PRODUCTS_TYPES_URL =  this.HOST_URL + '/customers/api/product_types/';
    PRODUCTS_BY_CATEGORY_URL =  this.HOST_URL + '/customers/api/category/';
    CURRENT_PROFILE_URL = this.HOST_URL + '/stores/api/me/'; //current_profile
  
    ACCOUNT_ACTIVATION_URL =  this.HOST_URL + '/stores/api/activate/';

    CLEARANCES_URL =  this.HOST_URL + '/customers/api/clearance/';
    NEW_ARRIVALS_URL =  this.HOST_URL + '/customers/api/new_arrivals/';
    SEARCH_URL =  this.HOST_URL + '/customers/api/search/';

    FOR_HIM_URL =  this.HOST_URL + '/customers/api/for_him/';
    FOR_HER_URL =  this.HOST_URL + '/customers/api/for_her/';

    REVIEWS_URL =  this.HOST_URL + '/customers/api/reviews/';
    COUNTRYS_URL =  this.HOST_URL + '/customers/api/countrys/';
    SHIPPING_URL =  this.HOST_URL + '/customers/api/shipping/';



    
}
