import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchRiderSectionRoutingModule } from './dispatch-rider-section-routing.module';
import { DispatchRiderSectionComponent } from './dispatch-rider-section.component';


@NgModule({
  declarations: [DispatchRiderSectionComponent],
  imports: [
    CommonModule,
    DispatchRiderSectionRoutingModule
  ]
})
export class DispatchRiderSectionModule { }
