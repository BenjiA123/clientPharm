import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { CreateDetailComponent } from './create-detail/create-detail.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [CreateComponent, CreateDetailComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    AngularMaterialModule
  ]
})
export class CreateModule { }
