import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSectionRoutingModule } from './customer-section-routing.module';
import { DrugOverviewComponent } from './drug-overview/drug-overview.component';
import { DrugBookingComponent } from './drug-booking/drug-booking.component';
import { CustomersDrugDetailComponent } from './customers-drug-detail/customers-drug-detail.component';
import { SearchModule } from '../search/search.module';
import { AngularMaterialModule } from '../angular-material.module';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';


@NgModule({
  declarations: [DrugOverviewComponent, DrugBookingComponent, CustomersDrugDetailComponent, CustomerSettingComponent],
  imports: [
    CommonModule,
    CustomerSectionRoutingModule, SearchModule, AngularMaterialModule
  ]
})
export class CustomerSectionModule { }
