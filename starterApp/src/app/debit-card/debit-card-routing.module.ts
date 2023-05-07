import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebitCardComponent } from './debit-card.component';
// import {CreditCardHomeComponent} from "./credit-card-home/credit-card-home.component"
import {HomeComponent} from  './home/home.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'virtual-card',
    pathMatch: 'full',
  },

  {
    path: '',
    component: DebitCardComponent,
    children: [
      {path: '', component: HomeComponent},
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebitCardRoutingModule {}
