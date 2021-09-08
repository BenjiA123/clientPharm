import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { IgxGridModule } from 'igniteui-angular';


@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    IgxGridModule,
    TransactionRoutingModule
  ]
})
export class TransactionModule { }
