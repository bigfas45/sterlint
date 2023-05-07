import { CommonModule, DecimalPipe } from '@angular/common';

import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {  MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatSnackBarModule } from '@angular/material/snack-bar';

import {  MatDialogModule } from '@angular/material/dialog';

import { VirtualCardRoutingModule } from './virtual-card-routing.module';
// import { VirtualManageComponent } from './virtual-manage/virtual-manage.component';
// import {ManageCardsComponent} from './manage-cards/manage-cards.component'
import { VirtualRequestComponent } from './virtual-request/virtual-request.component';
import { CardFormartPipe } from "./card-formart.pipe";
import { SharedModule } from '../shared/shared.module';
import {CardManagementMainComponent} from './card-management-main/card-management-main.component'
import { CardOptionsComponent } from './card-management-main/card-options/card-options.component';

import { ManageCardsComponent } from './card-management-main/manage-cards/manage-cards.component';
import { SwiperModule } from 'swiper/angular';

const AngularMaterialComps = [
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule
];




@NgModule({
  declarations: [
    // VirtualManageComponent,
    VirtualRequestComponent,
    CardFormartPipe,
    ManageCardsComponent,
    CardManagementMainComponent,
    CardOptionsComponent
  ],
  imports: [
    CommonModule,
    VirtualCardRoutingModule,
    AngularMaterialComps,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SwiperModule
  ],
  providers: [DecimalPipe]

})
export class VirtualCardModule { }
