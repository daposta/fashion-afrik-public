import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductTypesService } from '../../services/product-types.service';
import { CurrencyService } from '../../services/currency.service';
import { ExchangeRateService } from '../../services/exchange-rate.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ CategoryService , StoreService, CartService, ProductService, ProductTypesService,
  CurrencyService, ExchangeRateService]
})
export class HeaderComponent implements OnInit {
  t = localStorage;
  categorys:any[];
  stores:any[];
  productTypes:any[];
  currencys:any[];
  exchange_rates :any[];
  selectedCategory:any;
  selectedProductType:any;
  error: any;
  @Input()
  cart: any[];
  @Input()
  customer: Object= {};
  constructor(private categorySrv:CategoryService, private storeSrv: StoreService, private currencySrv: CurrencyService,
   private cartSrv: CartService, private productSrv :ProductService, private productTypeSrv: ProductTypesService, 
   private rateSrv: ExchangeRateService) { }

  ngOnInit() {
  	this.fetchProductsByCategory();
  	this.fetchProductsByStore();
  	this.fetchClearanceSales();
    this.getCart();
    this.fetchCategories();
    this.fetchStores();
    this.fetchProductTypes();
    this.getCustomer();
    this.fetchCurrencys();
    this.fetchExchangeRates()
    if(!localStorage.getItem('currency')){
      localStorage.setItem('currency', 'GBP');
    }
    console.log(localStorage.getItem('currency'));
  }

  fetchProductsByCategory(){

  };

  fetchProductsByStore(){

  };

  fetchClearanceSales(){

  };

  fetchCategories(){
    
   this.categorySrv.fetchCategories().then(response => this.categorys = response.results)
  }

  fetchStores(){
    
   this.storeSrv.fetchStores().then(response => this.stores = response.results)
  }

  fetchCurrencys(){
    
   this.currencySrv.fetchCurrencys().then(response => this.currencys = response.results)
  }

fetchExchangeRates(){
    
   this.rateSrv.fetchRates().then(response => {
     
    this.exchange_rates = response.results;
     let selected_currency = this.exchange_rates.find(x =>  x['currency']['code'] == localStorage.getItem('currency'));
     localStorage.setItem('rate', selected_currency.rate);
   });
  
  }

  searchProduct(x){
  
   // this.productSrv.searchProduct(x);
   window.location.href = '/search/?q=' + x;
  }

  getCart(){

    this.cart = this.cartSrv.loadCart()//.then(response => this.cart = response)
    
  }

  getCustomer(){
    this.customer =  JSON.parse( localStorage.getItem('customer'));
   
  }

  fetchProductTypes(){
    this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  }

 setCategory(x){
   this.selectedCategory = x;
 }

 changeCurrency(evt){
     localStorage.setItem('currency' , evt.target.value);
     let selected_currency = this.exchange_rates.find(x =>  x['currency']['code'] == localStorage.getItem('currency'));
     localStorage.setItem('rate', selected_currency.rate);

 }

 setProductType(x){
   this.selectedProductType = x;
 }

 setCustomerFromLogin(_customer:Object){
   
     this.customer = _customer;
   }
}
