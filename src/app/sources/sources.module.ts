import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesComponent } from './sources.component';
import { IgxGridModule } from 'igniteui-angular';


@NgModule({
  declarations: [SourcesComponent],
  imports: [
    CommonModule,
    SourcesRoutingModule,
    IgxGridModule,
  ]
})
export class SourcesModule { }
