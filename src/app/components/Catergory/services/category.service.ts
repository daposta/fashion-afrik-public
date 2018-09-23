import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../../../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CategoryService {

   private categoryURL =   this.globals.CATEGORYS_URL;

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchCategories(): Observable<any> {

    return this.http.get(this.categoryURL)
  }
}
