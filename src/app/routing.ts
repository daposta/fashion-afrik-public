import { Routes} from '@angular/router'

// components

import { LandingComponent } from './components/landing/landing.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { StoreDetailComponent } from './components/store-detail/store-detail.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

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
    { path: 'store/:store', component: StoreDetailComponent },

    { path: 'cart', component: ShoppingCartComponent },

    { path: 'checkout', component: CheckoutComponent },
    { path: '', loadChildren: './components/Misc/misc.module#MiscModule'},
    { path: '', loadChildren: './components/User/user.module#UserModule'},
    { path: '', loadChildren: './components/Products/products.module#ProductsModule'},
    { path: '', loadChildren: './components/Catergory/Catergory.module#CatergorysModule' },

    { path: 'not-found' , component: NotFoundPageComponent},
    { path: '**', redirectTo: '/not-found', pathMatch: 'full'},
    // { path: 'misc', loadChildren: () => MiscModule }
  ]