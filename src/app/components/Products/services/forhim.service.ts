import { HttpClient } from '@angular/common/http';
import { Globals } from '../../../shared/api';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ForhimService {
  private forHimURL = this.globals.FOR_HIM_URL;

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchForHim(): Observable<any> {
    return this.http.get(this.forHimURL)
  }
}
