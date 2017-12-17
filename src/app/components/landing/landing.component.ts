import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [ ProductService]
})
export class LandingComponent implements OnInit {
  
  newArrivals:any[];
  constructor(private productSrv :ProductService) { }

  ngOnInit() {
  	this.fetchNewArrivals();
  	this.fetchTopFiveStores();
  }

  fetchTopFiveStores(){

  }

  fetchNewArrivals(){
      this.productSrv.fetchNewArrivals().then(response => this.newArrivals = response.results)
    //.catch(err => this.error = err)
  }

  fetchWomen(){

  }

  fetchMen(){
    
  }

}
