import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';

import { Globals } from './shared/api';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LandingComponent } from './components/landing/landing.component';
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
import { ShippingComponent } from './components/shipping/shipping.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { ShippingReturnsComponent } from './components/shipping-returns/shipping-returns.component';
import { AboutComponent } from './components/about/about.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactComponent } from './components/contact/contact.component';

const appRoutes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'me', component: UserProfileComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'product/:id/:slug', component: ProductDetailComponent },
  { path: 'store/:store', component: StoreDetailComponent },
  { path: 'category/:category/:productType/:sub', component: CategoryDetailComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'clearance/:category/:productType/:sub', component: ClearanceSalesComponent },
  { path: 'new-arrivals/:category/:productType/:sub', component: NewArrivalsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'shipping-returns', component: ShippingReturnsComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contact-us', component: ContactComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    LandingComponent,
    ShoppingCartComponent,
    UserProfileComponent,
    CategoryDetailComponent,
    StoreDetailComponent,
    ClearanceSalesComponent,
    LoginComponent,
    CheckoutComponent,
    SearchResultsComponent,
    NewArrivalsComponent,
    PaymentComponent,
    ShippingComponent,
    ConfirmationComponent,
    WishlistComponent,
    TermsConditionsComponent,
    ShippingReturnsComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    FaqsComponent,
    SignUpComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {}),
    MomentModule,
  ],
  providers: [Globals,],
  bootstrap: [AppComponent]
})
export class AppModule { }
