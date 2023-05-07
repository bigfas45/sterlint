import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AssetUrlPipe } from '../core/pipes/asset.pipe';
import { SharedComponent } from './shared-component/shared.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ResetpasswordsuccessmodalComponent} from "./resetpasswordsuccessmodal/resetpasswordsuccessmodal.component";
import {SuccessboxComponent} from "./successbox/successbox.component";
import {ConfirmOtpComponent} from "./confirm-otp/confirm-otp.component";

const AngularMaterialComps = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
];

@NgModule({
  imports: [
    AngularMaterialComps,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AssetUrlPipe,
    SharedComponent,
    LoginDialogComponent,
    ResetpasswordsuccessmodalComponent,
    SuccessboxComponent,
    ConfirmOtpComponent
  ],
  exports: [
    AssetUrlPipe,
    AngularMaterialComps,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponent,
    ResetpasswordsuccessmodalComponent,
    SuccessboxComponent,
    ConfirmOtpComponent
  ],
})
export class SharedModule {}
