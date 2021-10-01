import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersEditComponent } from './users-edit/users-edit.component';

@NgModule({
  declarations: [UsersComponent, UsersDetailComponent, UsersEditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AngularMaterialModule, MatTooltipModule, ScrollingModule
  ]
})
export class UsersModule { }
