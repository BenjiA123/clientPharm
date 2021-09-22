import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ShortenPipe } from './shorten.pipe';


@NgModule({
  declarations: [ChartComponent, ShortenPipe],
  imports: [
    CommonModule,
    ChartRoutingModule,
    AngularMaterialModule

  ],
  providers: [DatePipe]
})
export class ChartModule { }
