import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-clearance-sales',
  templateUrl: './clearance-sales.component.html',
  styleUrls: ['./clearance-sales.component.scss'],
    providers: [ ProductService]
})
export class ClearanceSalesComponent implements OnInit {

  sales:any[];
  constructor(private productSrv :ProductService) { }

  ngOnInit() {
  	this.fetchClearance();
  }




   fetchClearance(){
      this.productSrv.fetchNewArrivals().then(response => this.sales = response.results)
    //.catch(err => this.error = err)
  }

}
