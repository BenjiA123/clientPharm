import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs.component';
import { AngularMaterialModule } from '../angular-material.module';
import { IgxGridModule } from "igniteui-angular";
import { SearchModule } from '../search/search.module';
import { DrugDetailComponent } from './drug-detail/drug-detail.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [DrugsComponent, DrugDetailComponent,],
  imports: [CommonModule,
    IgxGridModule,
    DrugsRoutingModule, MatCardModule,
    SearchModule,

    AngularMaterialModule],
  exports: [DrugsComponent, SearchModule]
})
export class DrugsModule { }
