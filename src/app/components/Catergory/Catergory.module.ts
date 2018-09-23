import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// module
import { SharedModule } from '../../shared/shared.module';

import { CatergoryRoutes } from './Catergory.routing';
// services
import { ProductService } from './services/product.service';
import { ProductTypesService } from './services/product-types.service';
import { CategoryService } from './services/category.service';
// components
import { ClearanceSalesComponent } from './clearance-sales/clearance-sales.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';




@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(CatergoryRoutes),
      SharedModule,
      FormsModule,
      ReactiveFormsModule
    ],
    declarations: [
    //  HeaderComponent
      ClearanceSalesComponent,
      NewArrivalsComponent,
      CategoryDetailComponent
    ],
    providers: [
        ProductService,
        ProductTypesService,
        CategoryService]
  })
  export class CatergorysModule { }