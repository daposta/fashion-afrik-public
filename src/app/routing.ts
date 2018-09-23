import { Routes} from '@angular/router'

// components

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
import { ForherComponent } from './components/forher/forher.component';
import { ForhimComponent } from './components/forhim/forhim.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';


// import { PaymentComponent } from './components/payment/payment.component';
// import { ShippingComponent } from './components/shipping/shipping.component';
// import { ConfirmationComponent } from './components/confirmation/confirmation.component';
// import { WishlistComponent } from './components/wishlist/wishlist.component';

// LaxyLoading
 import { MiscModule } from './components/Misc/misc.module';

export const appRoutes: Routes = [

    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
   // { path: 'register', component: SignUpComponent },
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
    { path: 'for-her', component: ForherComponent},
    { path: 'for-him', component: ForhimComponent},
    { path : 'forget-password', component: ForgetPasswordComponent},
    { path: '', loadChildren: './components/Misc/misc.module#MiscModule'}
    // { path: 'misc', loadChildren: () => MiscModule }
  ]