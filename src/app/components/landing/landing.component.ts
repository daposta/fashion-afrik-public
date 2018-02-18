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
  hers:any[];
  his:any[];
  error: any;

  constructor( private productSrv :ProductService) { }

  ngOnInit() {
  	this.fetchNewArrivals();
  	this.fetchTopFiveStores();
    this.fetchMen();
    this.fetchWomen();
    // localStorage.removeItem('cart');
    // localStorage.removeItem('auth_token');
    // localStorage.removeItem('checkout');
    // localStorage.removeItem('customer');


  }

  fetchTopFiveStores(){

  }

  fetchNewArrivals(){
      this.productSrv.fetchNewArrivals().then(response => this.newArrivals = response.results)
    //.catch(err => this.error = err)
  }

  fetchWomen(){
    this.productSrv.fetchHer()
    .subscribe(res =>{
        
      this.hers = res.results
    }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    })
    //.then(response => this.hers = response.results)
  }

  fetchMen(){
    this.productSrv.fetchHim().then(response => this.his = response.results)
  }

}
