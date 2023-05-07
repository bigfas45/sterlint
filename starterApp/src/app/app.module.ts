import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from './shared/shared.module';
import { ModalComponent } from './modal/modal.component';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { HttpRequestInterceptor } from './core/interceptor/httpinterceptor.service';
import { VirtualCardComponent } from './virtual-card/virtual-card.component';
import { DebitCardComponent } from './debit-card/debit-card.component';



@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    CreditCardComponent,
    VirtualCardComponent,
    DebitCardComponent,

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    SharedModule,
    MatDialogModule,
    HttpClientModule,
    MatCardModule

  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class AppModule { }
