
import { Injectable } from '@angular/core';

Injectable()
export class Globals{
	HOST_URL =  'http://127.0.0.1:8000';//    'http://139.162.248.210:8004';  // 
	LOGIN_URL =  this.HOST_URL + '/stores/api/login/';
    LOGOUT_URL = this.HOST_URL + '/stores/api/logout/';
    CATEGORYS_URL =  this.HOST_URL + '/customers/api/categorys/';
    PRODUCTS_URL =  this.HOST_URL + '/stores/api/products/';
    STORES_URL =  this.HOST_URL + '/customers/api/stores/';
    ORDERS_URL =  this.HOST_URL + '/stores/api/orders/';
    REGISTER_URL =  this.HOST_URL + '/stores/api/register/';
    //CREATE_PROFILE_URL =  this.HOST_URL + '/client/api/create_profile/';
    CURRENT_PROFILE_URL = this.HOST_URL + '/stores/api/me/'; //current_profile
   // PROFILE_DETAIL_URL = this.HOST_URL + '/client/api/profile_detail/';
    //FORGOT_PASS_URL = this.HOST_URL + '/client/api/forgot_password/';
    //RESET_PASS_URL = this.HOST_URL + '/client/api/reset_password/';
    ACCOUNT_ACTIVATION_URL =  this.HOST_URL + '/stores/api/activate/';

    
}