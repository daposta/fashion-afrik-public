import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clearance-sales',
  templateUrl: './clearance-sales.component.html',
  styleUrls: ['./clearance-sales.component.css']
})
export class ClearanceSalesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	this.fetchClearance();
  }


  fetchClearance(){

  }

}
