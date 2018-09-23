import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { TextMaskModule } from 'angular2-text-mask';
import { EcomProductZoomModalModule } from '@plency/ecom-product-zoom-modal';

import { Globals } from './shared/api';
// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

import { StoreDetailComponent } from './components/store-detail/store-detail.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

// routing
import { appRoutes } from './routing'
import { SharedModule } from './shared/shared.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';





@NgModule({
  declarations: [
    AppComponent,
  //  HeaderComponent,
    FooterComponent,
    LandingComponent,
    ShoppingCartComponent,
    StoreDetailComponent,
    CheckoutComponent,
    SearchResultsComponent,
    PaymentComponent,
    ShippingComponent,
    ConfirmationComponent,
    WishlistComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {}),
    MomentModule,
    TextMaskModule,
    EcomProductZoomModalModule,
  ],
  exports: [
    // HeaderComponent,
],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
