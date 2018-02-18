import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';


@Injectable()
export class CategoryService {

   private categoryURL =   this.globals.CATEGORYS_URL;

  constructor(private http: Http, private globals: Globals) { }


  fetchCategories(){
  	
    return this.http.get(this.categoryURL )
              .map(this.extractData)
        .catch(this.handleErrorObservable);
  };

   private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }
}
