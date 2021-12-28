import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { IgxGridModule } from 'igniteui-angular';
import { AngularMaterialModule } from '../angular-material.module';
import { TransactioDetailComponent } from './transactio-detail/transactio-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TransactionEffects } from './store/transaction.effect';
import { TransactionReducer } from './store/transaction.reducer';


@NgModule({
  declarations: [TransactionComponent, TransactioDetailComponent],
  imports: [
    CommonModule,
    IgxGridModule,
    TransactionRoutingModule,
    AngularMaterialModule,
    EffectsModule.forFeature([TransactionEffects]),
    StoreModule.forFeature('TransactionState', TransactionReducer),
  ]
})
export class TransactionModule { }
