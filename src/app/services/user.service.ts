import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

declare var $: any;

@Injectable()
export class UserService {

   private loginUrl = this.globals.LOGIN_URL; 
  private logoutUrl = this.globals.LOGOUT_URL; 
  private registerUrl = this.globals.REGISTER_URL; 

    private  loggedIn = false;


  constructor(private http: Http, private router:Router, private globals: Globals) { }


  login(data:any){
		//this.logout();
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin', '*') 
		let email = data["email"];
		let password = data['password'];
		return this.http.post(this.loginUrl,  JSON.stringify({email, password}), {headers})
		.map(this.extractData)
        .catch(this.handleErrorObservable);
		
	};


	logout(){
			let v = this.page_header();
			// localStorage.clear();
			// this.router.navigate(['/login']);

			this.http.post(this.logoutUrl, {}, v).subscribe(res => {
				localStorage.clear();
				this.loggedIn = false;
				this.router.navigate(['/login']);
			}, (err) => {
				localStorage.clear();
				this.router.navigate(['/login']);
				
			})
			
	};


	register(data: any , form:FormGroup){
		
		//let error =  <HTMLInputElement>document.getElementById('feedback_success');
		return this.http.post(this.registerUrl,data)
		.map(this.extractData)
        .catch(this.handleErrorObservable);
		
		// .subscribe(res =>{
		// 		form.reset();
		// 		let msg = JSON.parse(res['_body'])['message'];
		// 		$.toast({
		//         text: msg,
		//          position: 'top-center',
		//          'icon': 'success',
		//         showHideTransition: 'slide',
		//     });
				

		// }, error =>{
				
		// 		let msg = JSON.parse(error._body)['message'];
		// 		$.toast({
		//         text: msg,
		//          position: 'top-center',
		//          icon: 'error',
		//          showHideTransition: 'slide',
		//     });
			
		// })

	};

	  private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


     private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }


	private page_header(){
     let data =  localStorage.getItem('auth_token');
      let headers = new Headers();
      let opt: RequestOptions;
      headers.append('Authorization', 'JWT ' + data );
      opt = new RequestOptions({headers: headers})  ;
      return opt;
  }


   private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };


}
