import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    AngularMaterialModule

  ],
  providers: [DatePipe]
})
export class ChartModule { }
