import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { AppGuard } from '../auth/guards/app.guard';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardLayoutComponent,
  children: [
    {
      path: '',
      canActivate: [AppGuard],
      component: DashboardLayoutComponent,
      children: [
        { path: 'admin', component: DashboardLayoutComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
