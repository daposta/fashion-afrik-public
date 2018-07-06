import { Injectable } from '@angular/core';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

	private loginUrl = this.globals.LOGIN_URL;
	private logoutUrl = this.globals.LOGOUT_URL;
	private registerUrl = this.globals.REGISTER_URL;

	private loggedIn = false;

	authToken = localStorage.getItem('token');


	constructor(private http: HttpClient, private globals: Globals) { }

	login(data: any): Observable<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		let email = data['email'];
		let password = data['password'];

		return this.http.post(this.loginUrl, JSON.stringify({ email, password }), { headers })
	}

	register(data: any): Observable<any> {

		let formData = new FormData();
		formData.append('first_name', data['first_name']);
		formData.append('last_name', data['last_name']);
		formData.append('email', data['email']);
		formData.append('password', data['password']);
		formData.append('mobile', data['mobile']);
		formData.append('is_customer', 'true');

		return this.http.post(this.registerUrl, formData)
	}

	logout(): Observable<any> {

		let headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

		return this.http.post(this.logoutUrl, {}, { headers })
	}


}
