import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from "@angular/common";
import {EmptyRouteComponent} from "./empty-route/empty-route.component";

// const routes: Routes = [
//    {path: 'transfer', loadChildren: () => import('./transfer/transfer.module').then((m) => m.TransferModule )},
//   {path: 'international-transfer', loadChildren: () => import('./international-transfers/international-transfers.module').then((m) => m.InternationalTransfersModule )},
//   {path: 'beneficiaries', loadChildren: () => import('./beneficiaries/beneficiaries.module').then((m) => m.BeneficiariesModule )},
//   { path: '**', component: EmptyRouteComponent }

// ];


const routes: Routes = [

  {
    path: 'card-management',
    redirectTo: 'card-management/credit-card',
    pathMatch: 'full',
  },
  

    {path: 'card-management/credit-card', loadChildren: () => import('./credit-card/credit-card.module').then((m) => m.CreditCardModule )},
    {path: 'card-management/virtual-card', loadChildren: () => import('./virtual-card/virtual-card.module').then((m) => m.VirtualCardModule )},
    {path: 'card-management/debit-card', loadChildren: () => import('./debit-card/debit-card.module').then((m) => m.DebitCardModule )},

  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
