import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
declare var $: any;

// import  'slick-carousel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  // $(function(){
   	// $('.responsive').slick({
   	// 	 dots: true,
    //   infinite: false,
    //   speed: 300,
    //   slidesToShow: 5,
    //   slidesToScroll: 5
    //    	});
  // })
  }

}
