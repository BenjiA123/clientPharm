import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { CustomersDrugDetailComponent } from './customers-drug-detail/customers-drug-detail.component';
import { DrugOrderComponent } from './drug-order/drug-order.component';
import { DrugOverviewComponent } from './drug-overview/drug-overview.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: "drugs", component: DrugOverviewComponent, children: [

    ]
  },
  { path: "drugs-detail/:id", component: CustomersDrugDetailComponent },
  { path: "my-drugs", component: DrugOrderComponent },
  { path: "my-orders", component: OrdersComponent },
  { path: "settings", component: CustomerSettingComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerSectionRoutingModule { }
