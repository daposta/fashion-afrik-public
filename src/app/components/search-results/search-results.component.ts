import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductTypesService } from '../../services/product-types.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [  CategoryService,  ProductTypesService, ProductService]
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  t = localStorage;
  search_results: any[];
  q: any;
  error: any;
  sub: any;
  routeSub: Subscription;
  searchClean: Subscription;
  sx: string;
  productCheck: any[];
  constructor( private route: ActivatedRoute, private productSrv: ProductService, private router: Router) {

   }
   ngOnDestroy() {
    this.searchClean.unsubscribe();
  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
        this.sx = params['q']
        console.log(this.router.url);
    })
    console.log(this.sx);

    // const query = this.route.snapshot.queryParams['q'];
    // console.log(query);
    // this.q = query;
    this.sub = this.productSrv.searchProduct(this.sx)
    console.log(this.sub);
    this.searchClean = this.productSrv.searchProduct(this.sx).subscribe(res => {
      this.productCheck = this.search_results = res.results
      console.log(this.productCheck);
    }, err => {
        console.log(err);
    })
    this.productCheck = (this.sx) ?
      this.sub : this.search_results
  }

}
