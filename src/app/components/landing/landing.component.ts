import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Globals } from '../../shared/api';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [ ProductService]
})
export class LandingComponent implements OnInit {
  
  newArrivals:any[];
  hers:any[];
  his:any[];
  host_address: string =  this.globals.HOST_URL; 

  constructor(private globals: Globals, private productSrv :ProductService) { }

  ngOnInit() {
  	this.fetchNewArrivals();
  	this.fetchTopFiveStores();
    this.fetchMen();
    this.fetchWomen();
  }

  fetchTopFiveStores(){

  }

  fetchNewArrivals(){
      this.productSrv.fetchNewArrivals().then(response => this.newArrivals = response.results)
    //.catch(err => this.error = err)
  }

  fetchWomen(){
    this.productSrv.fetchHer().then(response => this.hers = response.results)
  }

  fetchMen(){
    this.productSrv.fetchHim().then(response => this.his = response.results)
  }

}
