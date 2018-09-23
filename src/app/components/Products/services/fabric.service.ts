import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../../../shared/api';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class FabricService {

  private fabricsUrl = this.globals.FABRICS_URL; 

  constructor(private http: Http, private globals: Globals,  private router:Router) { }

  fetchFabrics(){
    return this.http.get(this.fabricsUrl)
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
