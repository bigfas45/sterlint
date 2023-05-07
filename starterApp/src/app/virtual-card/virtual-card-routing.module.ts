import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualCardComponent } from './virtual-card.component';
import { VirtualRequestComponent } from './virtual-request/virtual-request.component';
// import { ManageCardsComponent } from './manage-cards/manage-cards.component';
import { CardManagementMainComponent } from './card-management-main/card-management-main.component';

import { ManageCardsComponent } from './card-management-main/manage-cards/manage-cards.component';

import { CardOptionsComponent } from "./card-management-main/card-options/card-options.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'virtual-card',
    pathMatch: 'full'
  },


{path: "", component: VirtualCardComponent , children:
[
  {path: "",component: CardManagementMainComponent,
  children: [
    {path: "", component: CardOptionsComponent},
    {path: "edit/:id", component: ManageCardsComponent}
  ]
},
{path: 'request', component: VirtualRequestComponent}
]
}


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualCardRoutingModule { }
