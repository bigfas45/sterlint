import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
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
import { SharedModule } from '../shared/shared.module'


import {  MatDialogModule } from '@angular/material/dialog';







import { CreditCardRoutingModule } from './credit-card-routing.module';
import { CreditCardHomeComponent } from './credit-card-home/credit-card-home.component';

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
  MatDialogModule,
  SharedModule
];


@NgModule({
  declarations: [
    CreditCardHomeComponent
  ],
  imports: [
    CommonModule,
    CreditCardRoutingModule,
    AngularMaterialComps,
    FormsModule,
    ReactiveFormsModule,
    

  ],
  providers: [DecimalPipe]

})
export class CreditCardModule { }
