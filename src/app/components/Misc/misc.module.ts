import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { miscRoutes } from './misc-routing';

// component

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';// 
// import { ShippingComponent } from '../shipping/shipping.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ShippingReturnsComponent } from './shipping-returns/shipping-returns.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from '../../shared/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(miscRoutes),
    SharedModule
  ],
  declarations: [
    AboutComponent,
    ContactComponent,
    FaqsComponent,
    PrivacyPolicyComponent,
    ShippingReturnsComponent,
    TermsConditionsComponent,
  //  HeaderComponent
  ]
})
export class MiscModule { }
