import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpRequestInterceptor} from "./core/interceptor/httpinterceptor.service";
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { DebitcardResetComponent } from './pages/debitcard-reset/debitcard-reset.component';
import { PinresetComponent } from './pages/pinreset/pinreset.component';
import { SecretwordresetComponent } from './pages/secretwordreset/secretwordreset.component';
import { NewRestpasswordpageComponent } from './pages/new-restpasswordpage/new-restpasswordpage.component';
import { FormsModule,NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuicksurveyComponent } from './pages/quicksurvey/quicksurvey.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetpasswordComponent,
    DebitcardResetComponent,
    PinresetComponent,
    SecretwordresetComponent,
    NewRestpasswordpageComponent,
    QuicksurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
