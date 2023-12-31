import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from './auth/guards/app.guard';
import { DashboardLayoutComponent } from './dashboard/pages/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'app',
    canActivate: [AppGuard],
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardLayoutComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
