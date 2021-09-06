import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CreateUserComponent } from './create-user/create-user.component';


@NgModule({
  declarations: [LoginComponent, CreateUserComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule, 
  ]
})
export class AuthModule { }
