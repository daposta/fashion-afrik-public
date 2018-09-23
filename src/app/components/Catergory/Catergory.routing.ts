import { ClearanceSalesComponent } from './clearance-sales/clearance-sales.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

export const CatergoryRoutes = [
    { path: 'clearance/:category/:productType/:sub', component: ClearanceSalesComponent },
    { path: 'new-arrivals/:category/:productType/:sub', component: NewArrivalsComponent },
    { path: 'category/:category/:productType/:sub', component: CategoryDetailComponent },
]