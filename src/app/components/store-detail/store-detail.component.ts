import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss'],
   providers: [ ProductService, CategoryService]
})
export class StoreDetailComponent implements OnInit {
  
  products:any[];
  categorys:any[];

  constructor(private productSrv :ProductService, private route: ActivatedRoute, 
    private categorySrv:CategoryService) { }

  ngOnInit() {
  	this.route.params.switchMap((params: Params) => 
			 	this.productSrv.fetchProductsByStore(params['store']))
			 .subscribe(
			 	data => {
               this.products = data.results;
          
         });

       this.fetchCategories();
  }



  fetchCategories(){
       this.categorySrv.fetchCategories().then(response => this.categorys = response.results)

  }

}
