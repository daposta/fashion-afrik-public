import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ CategoryService , StoreService]
})
export class HeaderComponent implements OnInit {

  categorys:any[];
  stores:any[];
   error: any;
  constructor(private categorySrv:CategoryService, private storeSrv: StoreService) { }

  ngOnInit() {
  	this.fetchProductsByCategory();
  	this.fetchProductsByStore();
  	this.fetchClearanceSales();
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

}
