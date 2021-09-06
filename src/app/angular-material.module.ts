import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
@NgModule({
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
    // MatNativeControl
    ]
})
export class AngularMaterialModule {

}