// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { Router } from '@angular/router';
// import { Globals } from '../shared/api';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Injectable()
export class UserService {

	private loginUrl = this.globals.LOGIN_URL;
	private logoutUrl = this.globals.LOGOUT_URL;
	private registerUrl = this.globals.REGISTER_URL;

	private loggedIn = false;

	authToken = localStorage.getItem('auth_token');


	constructor(private http: HttpClient, private globals: Globals) { }

	login(data: any): Observable<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		let email = data['email'];
		let password = data['password'];

		return this.http.post(this.loginUrl, JSON.stringify({ email, password }), { headers })
	}

	logout(): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'JWT ' + this.authToken
			})
		};

		return this.http.get(this.logoutUrl, httpOptions)
	}


	// logout() {
	// 	let v = this.page_header();
	// 	// localStorage.clear();
	// 	// this.router.navigate(['/login']);

	// 	this.http.post(this.logoutUrl, {}, v).subscribe(res => {
	// 		localStorage.clear();
	// 		this.loggedIn = false;
	// 		this.router.navigate(['/login']);
	// 	}, (err) => {
	// 		localStorage.clear();
	// 		this.router.navigate(['/login']);

	// 	})

	// };


	// register(data: any, form: FormGroup) {

	// 	return this.http.post(this.registerUrl, data)
	// 		.map(this.extractData)
	// 		.catch(this.handleErrorObservable);
	// };

	register(data: any): Observable<any> {
		
		return this.http.post(this.registerUrl, data)
	}



	private extractData(res: Response) {
		let body = res.json();
		return body || {};
	}


	private handleErrorObservable(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}


	private page_header() {
		let data = localStorage.getItem('auth_token');
		let headers = new Headers();
		let opt: RequestOptions;
		headers.append('Authorization', 'JWT ' + data);
		opt = new RequestOptions({ headers: headers });
		return opt;
	}


	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	};


}
