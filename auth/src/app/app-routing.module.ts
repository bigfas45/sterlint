import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebitcardResetComponent } from './pages/debitcard-reset/debitcard-reset.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { LoginComponent } from './pages/login/login.component';
import { PinresetComponent } from './pages/pinreset/pinreset.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { SecretwordresetComponent } from './pages/secretwordreset/secretwordreset.component';
import { NewRestpasswordpageComponent } from './pages/new-restpasswordpage/new-restpasswordpage.component';


const routes: Routes = [
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/resetPassword',
    component:ResetpasswordComponent
  },
  {
    path: 'auth/changePassword',
    component: NewRestpasswordpageComponent
  },
  {
    path: 'auth/debitcard-reset',
    component:DebitcardResetComponent
  },
  {
    path: 'auth/secretwordreset',
    component:SecretwordresetComponent
  },
  {
    path: 'auth/pinreset',
    component:PinresetComponent
  },
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
