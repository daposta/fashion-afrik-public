import { Routes} from '@angular/router'

// components

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LandingComponent } from './components/landing/landing.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { StoreDetailComponent } from './components/store-detail/store-detail.component';
import { ClearanceSalesComponent } from './components/clearance-sales/clearance-sales.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';

// import { PaymentComponent } from './components/payment/payment.component';
// import { ShippingComponent } from './components/shipping/shipping.component';
// import { ConfirmationComponent } from './components/confirmation/confirmation.component';
// import { WishlistComponent } from './components/wishlist/wishlist.component';

// LaxyLoading
 import { MiscModule } from './components/Misc/misc.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const appRoutes: Routes = [

    { path: '', component: LandingComponent },
    { path: 'search', component: SearchResultsComponent },
    { path: 'product/:id/:slug', component: ProductDetailComponent },
    { path: 'store/:store', component: StoreDetailComponent },
    { path: 'category/:category/:productType/:sub', component: CategoryDetailComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'clearance/:category/:productType/:sub', component: ClearanceSalesComponent },
    { path: 'new-arrivals/:category/:productType/:sub', component: NewArrivalsComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '', loadChildren: './components/Misc/misc.module#MiscModule'},
    { path: '', loadChildren: './components/User/user.module#UserModule'},
    { path: '', loadChildren: './components/HimHer/himHer.module#HimHerrModule'},

    { path: 'not-found' , component: NotFoundPageComponent},
    { path: '**', redirectTo: '/not-found', pathMatch: 'full'},
    // { path: 'misc', loadChildren: () => MiscModule }
  ]