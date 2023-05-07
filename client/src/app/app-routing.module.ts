import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlComponent } from './control/control.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageNewMicroAppsComponent } from './pages/manage-new-micro-apps/manage-new-micro-apps.component';
import { UpdateControlComponent } from './pages/update-control/update-control.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./control/control.module').then(mod => mod.ControlModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
