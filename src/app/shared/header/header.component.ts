import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'

import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductTypesService } from '../../services/product-types.service';
import { CurrencyService } from '../../services/currency.service';
import { UserService } from '../../services/user.service';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { query } from '@angular/core/src/animation/dsl';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CategoryService, StoreService, CartService, ProductService, ProductTypesService,
    CurrencyService, ExchangeRateService, UserService]
})
export class HeaderComponent implements OnInit {
  t = localStorage;
  searched: any[];
  categorys: any[];
  stores: any[];
  productTypes: any[];
  currencys: any[];
  exchange_rates: any[];
  selectedCategory: any;
  selectedProductType: any;
  error: any;

  filterProduct: Subscription

  @Input()
  cart: any[];
  @Input()
  customer: Object = {};
  constructor(private categorySrv: CategoryService, private storeSrv: StoreService, private currencySrv: CurrencyService,
    private cartSrv: CartService, private productSrv: ProductService, private productTypeSrv: ProductTypesService,
    private rateSrv: ExchangeRateService, private userSrv: UserService, private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'GBP');
    }

    this.getCustomer();
    this.fetchCategories();
    this.fetchCurrencys();
    this.getCart();
    this.fetchExchangeRates()


    // this.fetchStores();
    // this.fetchProductTypes();
    // this.fetchProductsByCategory();
    // this.fetchProductsByStore();
    // this.fetchClearanceSales();

  }

  fetchCategories() {
    this.categorySrv.fetchCategories().subscribe(
      res => {
        this.categorys = res.data;
        // console.log(this.categorys);
      }, err => {
        console.log(err);
      }
    )
  }

  fetchCurrencys() {

    this.currencySrv.fetchCurrencys()
      .subscribe(res => {
        this.currencys = res.data;
        // console.log(this.currencys);
      }, err => {
        console.log(err);
      });
  }

  getCart() {

    this.cart = this.cartSrv.loadCart()
  }

  // fetchStores() {

  //   this.storeSrv.fetchStores().subscribe(
  //     res => {
  //       this.stores = res;
  //       console.log(this.stores);
  //     }, err => {
  //       console.log(err);
  //     });
  // }

  // fetchProductTypes() {
  //   this.productTypeSrv.fetchProductTypes().subscribe(
  //     res => {
  //       this.productTypes = res;
  //     }, err => {
  //       // let msg = JSON.parse(err._body)['message'];
  //       // this.error = msg;
  //       console.log(err);
  //     });
  // }

  setCategory(x) {
    this.selectedCategory = x;
    // console.log(x);
  }

  setProductType(x) {
    this.selectedProductType = x;
    // console.log(x);
  }


  getCustomer() {
    this.customer = JSON.parse(localStorage.getItem('customer'));
  }

  // fetchProductsByCategory() {

  // };

  // fetchProductsByStore() {

  // };

  // fetchClearanceSales() {

  // };

  fetchExchangeRates() {

    this.rateSrv.fetchRates().subscribe(res => {

      this.exchange_rates = res.data;
       console.log(this.exchange_rates);
      const selected_currency = this.exchange_rates.find(x => x['currency']['code'] === localStorage.getItem('currency'));
      localStorage.setItem('rate', selected_currency.rate);
    }, err => {
      console.log(err);
    });

  }

  searchProduct(x: string) {
    const query  = x;
    console.log(query);
     this.router.navigate(['/search',   {q: query} ]);
        // this.productSrv.searchProduct(query)
        // .subscribe(res => { this.searched = res.results})
        // console.log(this.searched);
    }


    // console.log(this.router.url)
    // this.productSrv.searchProduct(x);
      // window.location.href = '/search/?q=' + x;


         // this.router.navigate(['/search',   {q: query} ]);

    //   this.sub = this.productSrv.searchProduct(this.sx)
    // this.productSrv.searchProduct(this.sx).subscribe(res => {
    //   this.search_results = res.results
    //   console.log(this.search_results);
  // }







  changeCurrency(evt) {
    localStorage.setItem('currency', evt.target.value);
    const selected_currency = this.exchange_rates.find(x => x['currency']['code'] === localStorage.getItem('currency'));
    localStorage.setItem('rate', selected_currency.rate);

  }

  // setProductType(x) {
  //   this.selectedProductType = x;
  // }

  // setCustomerFromLogin(_customer: Object) {

  //   this.customer = _customer;
  // }

  logout() {
    this.userSrv.logout().subscribe(res => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }, err => {
      localStorage.clear();
      this.router.navigate(['/login']);
    })
  }
}
