import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageWebAdvertDisplayComponent } from '../component/manage-web-advert-display/manage-web-advert-display.component';
import { AuditTrailComponent } from '../pages/audit-trail/audit-trail.component';
import { CustomersComponent } from '../pages/customers/customers.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ListOfBanksComponent } from '../pages/list-of-banks/list-of-banks.component';
import { ListOfBranchesComponent } from '../pages/list-of-branches/list-of-branches.component';
import { ListOfStatesComponent } from '../pages/list-of-states/list-of-states.component';
import { ManageAdvertCreateNewComponent } from '../pages/manage-advert-create-new/manage-advert-create-new.component';
import { ManageAdvertComponent } from '../pages/manage-advert/manage-advert.component';
import { ManageMobileAdvertCreateNewComponent } from '../pages/manage-mobile-advert-create-new/manage-mobile-advert-create-new.component';
import { ManageMobileAdvertComponent } from '../pages/manage-mobile-advert/manage-mobile-advert.component';
import { ManageNewMicroAppsComponent } from '../pages/manage-new-micro-apps/manage-new-micro-apps.component';
import { PushNotificationCreateNotificationComponent } from '../pages/push-notification-create-notification/push-notification-create-notification.component';
import { PushNotificationViewAnalyticsComponent } from '../pages/push-notification-view-analytics/push-notification-view-analytics.component';
import { PushNotificationComponent } from '../pages/push-notification/push-notification.component';
import { TransactionsPageComponent } from '../pages/transactions-page/transactions-page.component';
import { UpdateControlComponent } from '../pages/update-control/update-control.component';
import { ControlComponent } from './control.component';

const routes: Routes = [
  {path: '', component: ControlComponent, children:[
    {path: '', component: DashboardComponent},
    {path: 'updatecontrol', component: UpdateControlComponent},
    {path: 'manage-web-advert', component: ManageAdvertComponent, children:[
      {path:'',component:ManageWebAdvertDisplayComponent},
      {path:'create-new',component:ManageAdvertCreateNewComponent},
      ]
    },
    {path: 'manage-mobile-advert', component: ManageMobileAdvertComponent},
    {path: 'manage-mobile-advert-create-new', component: ManageMobileAdvertCreateNewComponent},
    {path: 'push-notifications', component: PushNotificationComponent},
    {path: 'push-notifications-create-notification', component: PushNotificationCreateNotificationComponent},
    {path: 'push-notifications-view-analytics', component: PushNotificationViewAnalyticsComponent},
    {path: 'customers', component: CustomersComponent},
    {path: 'transactions-page', component: TransactionsPageComponent},
    {path: 'audit-trail', component: AuditTrailComponent},

    {path: 'list-of-states', component: ListOfStatesComponent},
    {path: 'list-of-branches', component: ListOfBranchesComponent},
    {path: 'list-of-banks', component: ListOfBanksComponent},

    ]
  },
  // {path: '', component: DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
