
import { Injectable } from '@angular/core';

Injectable()
export class Globals{
    HOST_URL =  'https://vogueafriq.com/api';
    FAKE_URL = 'customers/category/'

    // fake endpoint
    FAKE_PRODUCT_URL = this.FAKE_URL

    // Verified endpoints
    REGISTER_URL =  this.HOST_URL + '/register/';
    LOGIN_URL =  this.HOST_URL + '/login/';
    LOGOUT_URL = this.HOST_URL + '/logout/';
    CATEGORYS_URL =  this.HOST_URL + '/customers/l1categories/';
    PRODUCTS_TYPES_URL =  this.HOST_URL + '/customers/l2categories/';
    PRODUCTS_URL =  this.HOST_URL + '/customers/products/';
    CURRENCYS_URL =  this.HOST_URL + '/customers/currencys/';
    EXCHANGE_RATES_URL =  this.HOST_URL + '/customers/exchange_rates/';
    CREATEORDER_URL = this.HOST_URL + '/customers/orders/';
    ORDERS_URL =  this.HOST_URL + '/customers/orders/';
    COUNTRYS_URL =  this.HOST_URL + '/customers/countrys/';
    REGIONS_URL = this.HOST_URL + '/customers/regions/';
    PRODUCTS_BY_CATEGORY_URL =  this.HOST_URL + '/customers/category/';
    CLEARANCES_URL =  this.HOST_URL + '/customers/clearance/';
    FOR_HIM_URL =  this.HOST_URL + '/customers/for_him/';
    FOR_HER_URL =  this.HOST_URL + '/customers/for_her/';
    SHIPPING_URL =  this.HOST_URL + '/customers/shipping/';
    SHIPPINGRATE_URL = this.HOST_URL + '/customers/shipping_rates/';
    COLORS_URL =  this.HOST_URL + '/customers/colors/';
    CARDPAYMENT_URL = this.HOST_URL + '/customers/payment/';
    PICKUP_POINT_URL = this.HOST_URL + '/customers/pickup_points/';
    NEW_ARRIVALS_URL =  this.HOST_URL + '/customers/new_arrivals_shortlist/'
    
    
    
    
    // Unverified endpoints
    
    STORES_URL =  this.HOST_URL + '/customers/api/stores/';
    PAYMENTS_URL =  this.HOST_URL + '/customers/api/pay/';
    PRODUCTS_BY_STORE_URL =  this.HOST_URL + '/customers/store/';
    CURRENT_PROFILE_URL = this.HOST_URL + '/customers/api/me/'; //current_profile
    
    ACCOUNT_ACTIVATION_URL =  this.HOST_URL + '/customers/api/activate/';
    
   ;
    SEARCH_URL =  this.HOST_URL + '/customers/search/';
    
    
    REVIEWS_URL =  this.HOST_URL + '/customers/reviews/';
    
    WISHLIST_URL =  this.HOST_URL + '/customers/wishlist/';
    
    FABRICS_URL =  this.HOST_URL + '/customers/fabrics/';
    SIZES_URL =  this.HOST_URL + '/customers/api/sizes/';
    
    
    
    
    // STORE_DETAIL_URL =  this.HOST_URL + '/customers/api/stores/';

    
}
