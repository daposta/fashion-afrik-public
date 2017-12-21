import { Component, OnInit } from '@angular/core';
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
   error: any;
   cart: any[];
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
  
    this.productSrv.searchProduct(x);
  }

  getCart(){
    this.cart = this.cartSrv.loadCart()//.then(response => this.cart = response)
    
  }

  fetchProductTypes(){
    //this.productTypes = this.productTypeSrv.fetchProductTypes();
    this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  }

 setCategory(x){
   this.selectedCategory = x;
   console.log(this.selectedCategory);
 }
}
