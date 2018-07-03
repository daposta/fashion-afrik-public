// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { Globals } from '../shared/api';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Globals } from '../shared/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CountryService {
 
  private countrysUrl = this.globals.COUNTRYS_URL; 
  private regionsUrl = this.globals.REGIONS_URL;

  constructor(private http: HttpClient, private globals: Globals) { }


  fetchCountrys(): Observable<any>{

  	 return this.http.get(this.countrysUrl )    
  }

  fetchRegion(country): Observable<any> {

    let params = new HttpParams().set('country', country);

    return this.http.get(this.regionsUrl, {params})
  }

}
