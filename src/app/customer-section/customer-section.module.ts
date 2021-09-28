import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSectionRoutingModule } from './customer-section-routing.module';
import { DrugOverviewComponent } from './drug-overview/drug-overview.component';
import { DrugBookingComponent } from './drug-booking/drug-booking.component';
import { CustomersDrugDetailComponent } from './customers-drug-detail/customers-drug-detail.component';


@NgModule({
  declarations: [DrugOverviewComponent, DrugBookingComponent, CustomersDrugDetailComponent],
  imports: [
    CommonModule,
    CustomerSectionRoutingModule
  ]
})
export class CustomerSectionModule { }
