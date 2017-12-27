import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { PasswordValidation } from '../../validators/password-confirm-validator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
 

  loginForm:FormGroup;
  registerForm:FormGroup;
  loginUser: Object= {};
  registerUser: Object= {};
  private loginAttempt: boolean;
  private registerAttempt: boolean;

  constructor(fb: FormBuilder,  private userSrv: UserService) { 
  	// let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  	 this.loginForm = fb.group({
        'email':['', Validators.required,],
        'password':['', Validators.required],
      });

       this.registerForm = fb.group({
          'firstName':['', Validators.required],
          'lastName':['', Validators.required],
          'email':['', Validators.required, ],
          'password':['', Validators.required],
          'confirmPassword':['', Validators.required],
          'mobile':['', Validators.required],
      });
  }



  ngOnInit( ) {
  }

  login(){
  	this.loginAttempt = true;
    if (this.loginForm.valid){
        this.userSrv.login(this.loginUser, this.loginForm)
       }
  }

  register(){
  	 this.registerAttempt = true;
    if (this.registerForm.valid){
    	
   		this.userSrv.register(this.registerUser, this.registerForm);
       }
  }

}
