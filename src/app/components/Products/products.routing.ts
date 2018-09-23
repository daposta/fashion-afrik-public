import { ForherComponent } from './forher/forher.component';
import { ForhimComponent } from './forhim/forhim.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const ProductsRoutes = [
    { path: 'for-her', component: ForherComponent},
    { path: 'for-him', component: ForhimComponent},
    { path: 'product/:id/:slug', component: ProductDetailComponent },
]
