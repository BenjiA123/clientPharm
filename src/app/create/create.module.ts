import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { CreateDetailComponent } from './create-detail/create-detail.component';


@NgModule({
  declarations: [CreateComponent, CreateDetailComponent],
  imports: [
    CommonModule,
    CreateRoutingModule
  ]
})
export class CreateModule { }
