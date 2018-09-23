import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component'
import { SignUpComponent } from './sign-up/sign-up.component';


export const userRoutes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignUpComponent },
    { path: 'me', component: UserProfileComponent },
    { path : 'forget-password', component: ForgetPasswordComponent}
]