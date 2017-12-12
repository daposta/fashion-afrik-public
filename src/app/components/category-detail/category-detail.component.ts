import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
   providers: [ ProductService]
})
export class CategoryDetailComponent implements OnInit {
  
  products:any[];
  host_address: string =  this.globals.HOST_URL; 
  category:string;
  constructor(private productSrv :ProductService, private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
    let t = this.route;
  	this.route.params.switchMap((params: Params) => 
			 	this.productSrv.fetchProductsByCategory(params['category']))
			 .subscribe(
			 	data => {
               this.products = data.results;
               this.category = t.snapshot.params['category'];
          
         });
  }

}
