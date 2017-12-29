import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class CountryService {
 
  private countrysUrl = this.globals.COUNTRYS_URL; 


  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  fetchCountrys(){

  	 return this.http.get(this.countrysUrl )
              .toPromise()
              .then(response => response.json())
              //.catch(this.handleError);
    
  }

}
