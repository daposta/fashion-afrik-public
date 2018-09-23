import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// module
import { SharedModule } from '../../shared/shared.module';


import { HimHerRoutes } from './himHer.routing'
// service
import { ForherService } from './services/forher.service';
import { ForhimService } from './services/forhim.service';
// component
import { ForherComponent } from './forher/forher.component';
import { ForhimComponent } from './forhim/forhim.component';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(HimHerRoutes),
      SharedModule,
    ],
    declarations: [
    //  HeaderComponent
        ForherComponent,
        ForhimComponent
    ],
    providers: [
        ForherService,
        ForhimService
    ]
  })
  export class HimHerrModule { }