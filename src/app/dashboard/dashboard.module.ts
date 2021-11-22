import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AngularMaterialModule } from '../angular-material.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule, AngularMaterialModule, MatIconModule

  ]
})
export class DashboardModule { }
