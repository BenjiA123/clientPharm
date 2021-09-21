import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { IgxGridModule } from 'igniteui-angular';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    IgxGridModule,
    TransactionRoutingModule,
    AngularMaterialModule
  ]
})
export class TransactionModule { }
