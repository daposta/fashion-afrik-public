import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [ ProductService]
})
export class LandingComponent implements OnInit {
  newArrivals: any[];
  hers: any[];
  his: any[];
  error: any;

  constructor( private productSrv: ProductService) { }

  ngOnInit() {
    this.fetchWomen();
    this.fetchMen();
    this.fetchNewArrivals();
  }

  fetchNewArrivals() {
    this.productSrv.fetchNewArrivals()
    .subscribe(res => {
      this.newArrivals = res.results;
      console.log(this.newArrivals);
    }, err => {
      console.log(err);
    })
  }

  fetchWomen() {
    this.productSrv.fetchHer()
    .subscribe(res => {
      this.hers = res.results;
      console.log(this.hers);
    }, err => {
      console.log(err);
    })
  }

  fetchMen() {
    this.productSrv.fetchHim()
    .subscribe(res => {
      this.his = res.results;
      console.log(this.his);
    }, err => {
      console.log(err);
    })
  }

}
