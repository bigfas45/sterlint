import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardComponent } from './credit-card.component';
import {CreditCardHomeComponent} from "./credit-card-home/credit-card-home.component"



const routes: Routes = [
  {
    path: '',
    redirectTo: 'virtual-card',
    pathMatch: 'full'
  },
{
  path: '', component: CreditCardComponent,
  children: [
    {path: '', component: CreditCardHomeComponent},
  
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditCardRoutingModule { }
