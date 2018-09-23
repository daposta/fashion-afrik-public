import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { ProductService } from '../../services/product.service';
import { NewArrivalsService } from '../../services/new-arrivals.service';
import { Subscription } from 'rxjs/RX';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [ ProductService, NewArrivalsService]
})
export class LandingComponent implements OnInit , OnDestroy{
  newArrivals: any[];
  hers: any[];
  his: any[];
  error: any;
  menClean: Subscription;
  womenClean: Subscription;
  arrivalClean: Subscription

  constructor(
    private productSrv: ProductService,
    private newArrivalSrv: NewArrivalsService,
    private title: Title,
    private meta: Meta ) { }

  ngOnInit() {
    this.title.setTitle('Home / VogueAfriq');
    this.meta.updateTag({
        'description': 'E-commerce shopping site for ankara'
    });
    this.fetchWomen();
    this.fetchMen();
    this.fetchNewArrivals();
  }

  fetchNewArrivals() {
   this.arrivalClean = this.newArrivalSrv.fetchNewArrivals()
    .subscribe(res => {
      this.newArrivals = res.results;
      console.log(this.newArrivals);
    }, err => {
      console.log(err);
    })
  }


  fetchWomen() {
   this.womenClean =  this.productSrv.fetchHer()
    .subscribe(res => {
      this.hers = res.results;
      console.log(this.hers);
    }, err => {
      console.log(err);
    })
  }

  fetchMen() {
  this.menClean =  this.productSrv.fetchHim()
    .subscribe(res => {
      this.his = res.results;
      console.log(this.his);
    }, err => {
      console.log(err);
    })
  }
  ngOnDestroy() {
    this.arrivalClean.unsubscribe()
    this.womenClean.unsubscribe()
    this.menClean.unsubscribe();
  }
}
