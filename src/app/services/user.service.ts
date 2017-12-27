import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Injectable()
export class UserService {

   private loginUrl = this.globals.LOGIN_URL; 
  private logoutUrl = this.globals.LOGOUT_URL; 
  private registerUrl = this.globals.REGISTER_URL; 

    private  loggedIn = false;


  constructor(private http: Http, private router:Router, private globals: Globals) { }


  login(data:any, form:FormGroup){
		//this.logout();
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin', '*') 
		let email = data["email"];
		let password = data['password'];
		return this.http.post(this.loginUrl,  JSON.stringify({email, password}), {headers})
		.subscribe(res =>{
				let data = res.json();

			 		form.reset();
				if (data.token){
					localStorage.setItem('auth_token', data.token);
					localStorage.setItem('customer', JSON.stringify(data.user));
					//window.location.href= '/';
				
					}
					else{
						this.router.navigateByUrl('/login');
					}

		}, error =>{

			let msg = JSON.parse(error._body)['message'];
			// form.reset();
				
			$.toast({
		        text: msg,
		         position: 'top-center',
		         'icon': 'error'
		    })
		   
			
		
			
		})

		
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
		.subscribe(res =>{
				form.reset();
				let msg = JSON.parse(res['_body'])['message'];
				$.toast({
		        text: msg,
		         position: 'top-center',
		         'icon': 'success',
		        showHideTransition: 'slide',
		    });
				

		}, error =>{
				
				let msg = JSON.parse(error._body)['message'];
				$.toast({
		        text: msg,
		         position: 'top-center',
		         icon: 'error',
		         showHideTransition: 'slide',
		    });
			
		})

	};


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
