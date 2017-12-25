import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule,  Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MomentModule } from 'angular2-moment';


import { Globals } from './shared/api';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { StoreDetailComponent } from './components/store-detail/store-detail.component';
import { ClearanceSalesComponent } from './components/clearance-sales/clearance-sales.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { PaymentComponent } from './components/payment/payment.component';

const appRoutes: Routes = [
  
    { path: '', component: LandingComponent   },
    { path: 'product/:id/:slug', component: ProductDetailComponent },
    { path: 'store/:store', component: StoreDetailComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'category/:category/:productType', component: CategoryDetailComponent },
    { path: 'cart', component: ShoppingCartComponent },
     { path: 'user-profile', component: UserProfileComponent },
    { path: 'clearance/:category/:productType', component: ClearanceSalesComponent },
    { path: 'new-arrivals', component: NewArrivalsComponent },
    { path: 'login', component: LoginComponent },
     { path: 'me', component: UserProfileComponent },
     { path: 'checkout', component: CheckoutComponent },
      { path: 'search-results', component: SearchResultsComponent },

]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    LandingComponent,
    RegisterComponent,
    ShoppingCartComponent,
    UserProfileComponent,
    CategoryDetailComponent,
    StoreDetailComponent,
    ClearanceSalesComponent,
    LoginComponent,
    CheckoutComponent,
    SearchResultsComponent,
    NewArrivalsComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,  HttpModule ,FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes, {}),
    MomentModule,
  ],
  providers: [Globals,],
  bootstrap: [AppComponent]
})
export class AppModule { }
