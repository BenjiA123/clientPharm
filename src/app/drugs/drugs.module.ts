import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs.component';
import { AngularMaterialModule } from '../angular-material.module';
import { IgxGridModule } from "igniteui-angular";
import { SearchModule } from '../search/search.module';
import { DrugDetailComponent } from './drug-detail/drug-detail.component';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { DrugReducer } from './store/drug.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DrugEffects } from './store/drug.effects';


@NgModule({
  declarations: [DrugsComponent, DrugDetailComponent,],
  imports: [CommonModule,
    IgxGridModule,
    DrugsRoutingModule, MatCardModule,
    SearchModule,
    EffectsModule.forFeature([DrugEffects]),
    StoreModule.forFeature('DrugState', DrugReducer),
    AngularMaterialModule],
})
export class DrugsModule { }
