import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {

   private categoryURL =   this.globals.CATEGORYS_URL;

  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  fetchCategories(){
  	
    return this.http.get(this.categoryURL)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  };

   private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

}
