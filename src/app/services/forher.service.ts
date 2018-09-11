import { HttpClient } from '@angular/common/http';
import { Globals } from './../shared/api';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class ForherService {
  private forHerURL = this.globals.FOR_HER_URL;

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchForHer(): Observable<any> {
    return this.http.get(this.forHerURL)
  }
  fetchForHerDetail(id: any): Observable<any> {
    return this.fetchForHer()
  }
}
