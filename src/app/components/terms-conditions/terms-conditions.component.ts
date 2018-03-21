import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	 $("html, body").animate({ scrollTop: 0 }, "slow");
  
  }

}
