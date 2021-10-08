import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSectionRoutingModule } from './customer-section-routing.module';
import { DrugOverviewComponent } from './drug-overview/drug-overview.component';
import { CustomersDrugDetailComponent } from './customers-drug-detail/customers-drug-detail.component';
import { SearchModule } from '../search/search.module';
import { AngularMaterialModule } from '../angular-material.module';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { DrugOrderComponent } from './customer-setting/drug-order/drug-order.component';
import { OrdersComponent } from './customer-setting/orders/orders.component';
import { EditUserComponent } from './customer-setting/edit-user/edit-user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ChangePasswordComponent } from './customer-setting/change-password/change-password.component';

@NgModule({
  declarations: [DrugOverviewComponent, CustomersDrugDetailComponent, CustomerSettingComponent, DrugOrderComponent, OrdersComponent, EditUserComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    CustomerSectionRoutingModule, SearchModule, AngularMaterialModule, MatTabsModule
  ]
})
export class CustomerSectionModule { }
