import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ControlModule } from './control/control.module';

// MODULE
import { MaterialModule } from "./material/material.module";
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlComponent } from './control/control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UpdateControlComponent } from './pages/update-control/update-control.component';
import { ManageNewMicroAppsComponent } from './pages/manage-new-micro-apps/manage-new-micro-apps.component';
import { LoginComponent } from './pages/login/login.component';
import { DeleteControlDialogComponent } from './component/dialog/delete-control-dialog/delete-control-dialog.component';
import { LogoutDialogComponent } from './component/dialog/logout-dialog/logout-dialog.component';
import { AddFeatureDialogComponent } from './component/dialog/add-feature-dialog/add-feature-dialog.component';
import { EditFeatureDialogComponent } from './component/dialog/edit-feature-dialog/edit-feature-dialog.component';
import { DeleteFeatureDialogComponent } from './component/dialog/delete-feature-dialog/delete-feature-dialog.component';
import { AddControlDialogComponent } from './component/dialog/add-control-dialog/add-control-dialog.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ManageAdvertComponent } from './pages/manage-advert/manage-advert.component';
import { ListOfStatesComponent } from './pages/list-of-states/list-of-states.component';
import { ListOfBranchesComponent } from './pages/list-of-branches/list-of-branches.component';
import { ListOfBanksComponent } from './pages/list-of-banks/list-of-banks.component';
import { ManageMobileAdvertComponent } from './pages/manage-mobile-advert/manage-mobile-advert.component';
import { PushNotificationComponent } from './pages/push-notification/push-notification.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { AuditTrailComponent } from './pages/audit-trail/audit-trail.component';
import { DeleteAdvertDialogComponent } from './component/dialog/delete-advert-dialog/delete-advert-dialog.component';
import { PushNotificationViewAnalyticsComponent } from './pages/push-notification-view-analytics/push-notification-view-analytics.component';
import { PushNotificationCreateNotificationComponent } from './pages/push-notification-create-notification/push-notification-create-notification.component';
import { ManageMobileAdvertCreateNewComponent } from './pages/manage-mobile-advert-create-new/manage-mobile-advert-create-new.component';
import { ManageAdvertCreateNewComponent } from './pages/manage-advert-create-new/manage-advert-create-new.component';
import { ManageWebAdvertDisplayComponent } from './component/manage-web-advert-display/manage-web-advert-display.component';
import { CreateWebAdvertDialogComponent } from './component/dialog/create-web-advert-dialog/create-web-advert-dialog.component';
import { PushNotificationAnalyticsCardComponent } from './component/push-notification-analytics-card/push-notification-analytics-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UpdateControlComponent,
    ManageNewMicroAppsComponent,
    LoginComponent,
    DeleteControlDialogComponent,
    LogoutDialogComponent,
    AddFeatureDialogComponent,
    EditFeatureDialogComponent,
    DeleteFeatureDialogComponent,
    AddControlDialogComponent,
    ControlComponent,
    HeaderComponent,
    SidebarComponent,
    ManageAdvertComponent,
     ListOfStatesComponent,
     ListOfBranchesComponent,
     ListOfBanksComponent,
     ManageMobileAdvertComponent,
     PushNotificationComponent,
     CustomersComponent,
     TransactionsPageComponent,
     AuditTrailComponent,
     DeleteAdvertDialogComponent,
     PushNotificationViewAnalyticsComponent,
     PushNotificationCreateNotificationComponent,
     ManageMobileAdvertCreateNewComponent,
     ManageAdvertCreateNewComponent,
     ManageWebAdvertDisplayComponent,
     CreateWebAdvertDialogComponent,
     PushNotificationAnalyticsCardComponent,
  ],
  entryComponents: [LogoutDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ControlModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
