import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ShippingReturnsComponent } from './shipping-returns/shipping-returns.component';
import { AboutComponent } from './about/about.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'
import { ContactComponent } from './contact/contact.component'



export const miscRoutes = [
  { path: 'terms-conditions', component: TermsConditionsComponent },
    { path: 'shipping-returns', component: ShippingReturnsComponent },
    { path: 'about-us', component: AboutComponent },
    { path: 'faqs', component: FaqsComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'contact-us', component: ContactComponent },
];

// const aboutRoutes = Routes({})
// @NgModule({
//   exports:[],
//   imports: []
// })
// export const MiscRouting = [
//   { path: 'terms-conditions', component: TermsConditionsComponent },
//   { path: 'shipping-returns', component: ShippingReturnsComponent },
//   { path: 'about-us', component: AboutComponent },
//   { path: 'faqs', component: FaqsComponent },
//   { path: 'privacy-policy', component: PrivacyPolicyComponent },
//   { path: 'contact-us', component: ContactComponent },
// ]
