import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';


@Component({
  selector: 'app-clearance-sales',
  templateUrl: './clearance-sales.component.html',
  styleUrls: ['./clearance-sales.component.scss'],
    providers: [ ProductService]
})
export class ClearanceSalesComponent implements OnInit {
  //products:any[];
  t = localStorage;
  host_address: string =  this.globals.HOST_URL; 
  category:string;
  productType:string;
  sales:any[];
  constructor(private productSrv :ProductService, private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
  	//this.fetchClearance();
    let t = this.route;
    this.route.params.switchMap((params: Params) => 
         this.productSrv.fetchClearance(params['category'], params['productType'] ))
       .subscribe(
         data => {
               this.sales = data.results;
               this.category = t.snapshot.params['category'];
               this.productType = t.snapshot.params['productType'];
          
         });
  }




   fetchClearance(){
      this.productSrv.fetchNewArrivals().then(response => this.sales = response.results)
    //.catch(err => this.error = err)
  }

}
