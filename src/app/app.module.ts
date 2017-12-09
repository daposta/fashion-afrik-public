import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule,  Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


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

const appRoutes: Routes = [
  
    { path: '', component: LandingComponent   },
    { path: 'product-detail', component: ProductDetailComponent },
    { path: 'store-detail', component: StoreDetailComponent },
    { path: 'category-detail', component: CategoryDetailComponent },
    { path: 'cart', component: ShoppingCartComponent },
     { path: 'user-profile', component: UserProfileComponent },

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
    ClearanceSalesComponent
  ],
  imports: [
    BrowserModule,  HttpModule ,FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
