import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ChartDetailsComponent } from './chart-details/chart-details.component';


@NgModule({
  declarations: [ChartComponent, ChartDetailsComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    AngularMaterialModule

  ],
  providers: [DatePipe]
})
export class ChartModule { }
