import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductTypesService } from '../../services/product-types.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ CategoryService , StoreService, CartService, ProductService, ProductTypesService]
})
export class HeaderComponent implements OnInit {

  categorys:any[];
  stores:any[];
  productTypes:any[];
  selectedCategory:any;
  selectedProductType:any;
  error: any;
  @Input()
  cart: any[];
  @Input()
  customer: Object= {};
  constructor(private categorySrv:CategoryService, private storeSrv: StoreService,
   private cartSrv: CartService, private productSrv :ProductService, private productTypeSrv: ProductTypesService) { }

  ngOnInit() {
  	this.fetchProductsByCategory();
  	this.fetchProductsByStore();
  	this.fetchClearanceSales();
    this.getCart();
    this.fetchCategories();
    this.fetchStores();
    this.fetchProductTypes();
    this.getCustomer();
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

 setProductType(x){
   this.selectedProductType = x;
 }

 setCustomerFromLogin(_customer:Object){
   
     this.customer = _customer;
   }
}
