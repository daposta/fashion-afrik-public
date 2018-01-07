import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { PasswordValidation } from '../../validators/password-confirm-validator';
declare var $: any;


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
  customer: Object= {};
  loggedIn:Boolean=false;
  @Output() notifyLogin: EventEmitter<Boolean> = new EventEmitter<Boolean>();


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
          'password':['', [Validators.required, Validators.minLength(8)]],
          'confirmPassword':['', [Validators.required, Validators.minLength(8)]],
          'mobile':['', Validators.required],
      },  {validator: this.checkPasswords});
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group

  let pass = group.controls['password'].value;
  let confirmPass = group.controls['confirmPassword'].value;

  return pass === confirmPass ? null : { notSame: true }     
	}



  ngOnInit( ) {
  }

  login(){
  	this.loginAttempt = true;
    if (this.loginForm.valid){
        this.userSrv.login(this.loginUser).subscribe(data=>{
         
            if(data){
                localStorage.setItem('auth_token', data.token);
              localStorage.setItem('customer', JSON.stringify(data.customer));
              this.customer = data.customer;
              this.loggedIn = true;
             this.notifyLogin.emit(this.loggedIn);

            }
            this.loginForm.reset();
        },  error=>{
            let msg = JSON.parse(error._body)['message'];

        
              $.toast({
                    text: msg,
                     position: 'top-center',
                     'icon': 'error'
                })
        });
       }
  }

  register(){
  	 this.registerAttempt = true;
    if (this.registerForm.valid){
    	
   		this.userSrv.register(this.registerUser, this.registerForm);
       }
  }

}
