import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NewArrivalsService } from '../../services/new-arrivals.service';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [ ProductService, NewArrivalsService]
})
export class LandingComponent implements OnInit {
  newArrivals: any[];
  hers: any[];
  his: any[];
  error: any;

  constructor( private productSrv: ProductService, private newArrivalSrv: NewArrivalsService ) { }

  ngOnInit() {
    this.fetchWomen();
    this.fetchMen();
    this.fetchNewArrivals();
  }

  fetchNewArrivals() {
    this.newArrivalSrv.fetchNewArrivals()
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
