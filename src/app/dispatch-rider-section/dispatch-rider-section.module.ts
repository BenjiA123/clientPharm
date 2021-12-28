import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchRiderSectionRoutingModule } from './dispatch-rider-section-routing.module';
import { DispatchRiderSectionComponent } from './dispatch-rider-section.component';
// import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { SearchModule } from '../search/search.module';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { AcceptedOrdersComponent } from './accepted-orders/accepted-orders.component';
import { AccidentOrdersComponent } from './accident-orders/accident-orders.component';
import { QueriedOrdersComponent } from './queried-orders/queried-orders.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DiapatchRiderEffects } from './store/dispatch-rider.effects';
import { DispatchRiderReducer } from './store/dispatch-rider.reducers';

@NgModule({
  declarations: [DispatchRiderSectionComponent, AllOrdersComponent, DeliveredOrdersComponent, AcceptedOrdersComponent, AccidentOrdersComponent, QueriedOrdersComponent],
  imports: [
    CommonModule,
    DispatchRiderSectionRoutingModule,
    //  MatSidenavModule,
    // MatSidenavContent,
    // MatSidenav,
    SearchModule,
    AngularMaterialModule,
    // MatTabsModule,
    AuthModule,
    EffectsModule.forFeature([DiapatchRiderEffects]),
    StoreModule.forFeature('DispatchRiderState', DispatchRiderReducer),
  ],
})
export class DispatchRiderSectionModule { }
