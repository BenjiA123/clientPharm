import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { CookieService } from 'ngx-cookie';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    CreatePasswordComponent, CreateCustomerComponent, ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule,

  ],
  providers: [
    CookieService
  ], exports: [ChangePasswordComponent]

})
export class AuthModule { }
