import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "create-user", component: CreateUserComponent },
  { path: "create-customer", component: CreateCustomerComponent },
  { path: "create-password/:token", component: CreatePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
