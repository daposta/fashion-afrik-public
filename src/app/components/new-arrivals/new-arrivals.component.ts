import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
      providers: [ ProductService]
})
export class NewArrivalsComponent implements OnInit {
  
  t = localStorage;
  arrivals:any[];
  constructor(private productSrv :ProductService) { }

  ngOnInit() {
  	 this.productSrv.fetchNewArrivals().then(response => this.arrivals = response.results)
  }

}
