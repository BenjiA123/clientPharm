import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs.component';

@NgModule({
  declarations: [DrugsComponent],
  imports: [CommonModule, DrugsRoutingModule],
})
export class DrugsModule {}
