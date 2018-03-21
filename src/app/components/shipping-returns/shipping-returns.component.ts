import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-shipping-returns',
  templateUrl: './shipping-returns.component.html',
  styleUrls: ['./shipping-returns.component.scss']
})
export class ShippingReturnsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	 $("html, body").animate({ scrollTop: 0 }, "slow");
  
  }

}
