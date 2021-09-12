import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [UsersComponent, UsersDetailComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AngularMaterialModule
  ]
})
export class UsersModule { }
