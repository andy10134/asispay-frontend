import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthScreenComponent } from './pages/auth-screen/auth-screen.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthScreenComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: RegisterFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
