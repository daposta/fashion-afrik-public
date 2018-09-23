import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// routes
import { userRoutes } from './user.routing';

// module
import { SharedModule } from '../../shared/shared.module';

// component
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// service
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ForgetPasswordComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent
  //  HeaderComponent
  ],
  providers: [
    OrderService,
    UserService
  ]
})
export class UserModule { }
