
import { Injectable } from '@angular/core';

Injectable()
export class Globals{
    HOST_URL =  'https://vogueafriq.com/api';
    
    // Verified endpoints
    CATEGORYS_URL =  this.HOST_URL + '/customers/l1categories/';
    PRODUCTS_TYPES_URL =  this.HOST_URL + '/customers/l2categories/';
    PRODUCTS_URL =  this.HOST_URL + '/customers/products/';
    CURRENCYS_URL =  this.HOST_URL + '/customers/currencys/';
    
    EXCHANGE_RATES_URL =  this.HOST_URL + '/customers/exchange_rates/';
    
    ORDERS_URL =  this.HOST_URL + '/customers/orders/';
    COUNTRYS_URL =  this.HOST_URL + '/customers/countrys/';
    PRODUCTS_BY_CATEGORY_URL =  this.HOST_URL + '/customers/category/';
    CLEARANCES_URL =  this.HOST_URL + '/customers/clearance/';
    // Unverified endpoints

	LOGIN_URL =  this.HOST_URL + '/login/';
    LOGOUT_URL = this.HOST_URL + '/customers/api/logout/';
    STORES_URL =  this.HOST_URL + '/customers/api/stores/';
    // STORE_DETAIL_URL =  this.HOST_URL + '/customers/api/stores/';
    REGISTER_URL =  this.HOST_URL + '/register/';
    PRODUCTS_BY_STORE_URL =  this.HOST_URL + '/customers/store/';
    CURRENT_PROFILE_URL = this.HOST_URL + '/customers/api/me/'; //current_profile
  
    ACCOUNT_ACTIVATION_URL =  this.HOST_URL + '/customers/api/activate/';

    NEW_ARRIVALS_URL =  this.HOST_URL + '/customers/new_arrivals/';
    SEARCH_URL =  this.HOST_URL + '/customers/search/';

    FOR_HIM_URL =  this.HOST_URL + '/customers/for_him/';
    FOR_HER_URL =  this.HOST_URL + '/customers/for_her/';

    REVIEWS_URL =  this.HOST_URL + '/customers/reviews/';
    SHIPPING_URL =  this.HOST_URL + '/customers/shipping/';

    WISHLIST_URL =  this.HOST_URL + '/customers/wishlist/';

    PAYMENTS_URL =  this.HOST_URL + '/customers/api/pay/';
    COLORS_URL =  this.HOST_URL + '/customers/colors/';
    FABRICS_URL =  this.HOST_URL + '/customers/fabrics/';
    SIZES_URL =  this.HOST_URL + '/customers/api/sizes/';





    
}
