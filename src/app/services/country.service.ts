import { Injectable } from '@angular/core';
import { Globals } from '../shared/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CountryService {
 
  private countrysUrl = this.globals.COUNTRYS_URL; 
  private regionsUrl = this.globals.REGIONS_URL;
  private pickupUrl = this.globals.PICKUP_POINT_URL;

  constructor(private http: HttpClient, private globals: Globals) { }


  fetchCountrys(): Observable<any>{

  	 return this.http.get(this.countrysUrl )    
  }

  fetchRegion(country): Observable<any> {

    let params = new HttpParams().set('country', country);

    return this.http.get(this.regionsUrl, {params})
  }

  fetchPickupPoints(country, region): Observable<any> {

    return this.http.get(this.pickupUrl + '?country=' + country + '&region=' + region);
  }

}
