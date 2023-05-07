import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebitCardRoutingModule } from './debit-card-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DebitCardRoutingModule,
    SharedModule,
    SwiperModule
  ]
})
export class DebitCardModule { }
