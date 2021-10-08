import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSectionRoutingModule } from './customer-section-routing.module';
import { DrugOverviewComponent } from './drug-overview/drug-overview.component';
import { CustomersDrugDetailComponent } from './customers-drug-detail/customers-drug-detail.component';
import { SearchModule } from '../search/search.module';
import { AngularMaterialModule } from '../angular-material.module';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { DrugOrderComponent } from './drug-order/drug-order.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [DrugOverviewComponent, CustomersDrugDetailComponent, CustomerSettingComponent, DrugOrderComponent, OrdersComponent],
  imports: [
    CommonModule,
    CustomerSectionRoutingModule, SearchModule, AngularMaterialModule
  ]
})
export class CustomerSectionModule { }
