import { Component, OnInit } from '@angular/core';
import { ProductTypesService } from '../../services/product-types.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [  CategoryService,  ProductTypesService]
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
