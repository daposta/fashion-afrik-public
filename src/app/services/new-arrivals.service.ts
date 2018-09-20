import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './../shared/api';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class NewArrivalsService {
  private newArrivalsURL = this.globals.NEW_ARRIVALS_URL

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchNewArrivals(): Observable<any> {
    return this.http.get(this.newArrivalsURL)
  }
}
