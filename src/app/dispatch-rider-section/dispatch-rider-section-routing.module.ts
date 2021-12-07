import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptedOrdersComponent } from './accepted-orders/accepted-orders.component';
import { AccidentOrdersComponent } from './accident-orders/accident-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { DispatchRiderSectionComponent } from './dispatch-rider-section.component';
import { QueriedOrdersComponent } from './queried-orders/queried-orders.component';

const routes: Routes = [
  { path: "", component: DispatchRiderSectionComponent },
  { path: "all-orders", component: AllOrdersComponent },
  { path: "queried-orders", component: QueriedOrdersComponent },
  { path: "delivered-orders", component: DeliveredOrdersComponent },
  { path: "accepted-orders", component: AcceptedOrdersComponent },
  { path: "accident-orders", component: AccidentOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispatchRiderSectionRoutingModule { }
