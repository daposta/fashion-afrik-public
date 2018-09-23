import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { TextMaskModule } from 'angular2-text-mask';
import { EcomProductZoomModalModule } from '@plency/ecom-product-zoom-modal';

import { Globals } from './api';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    RouterModule,
    TextMaskModule,
    EcomProductZoomModalModule,
  ],
  exports: [ HeaderComponent],
  providers: [Globals]
})
export class SharedModule { }
