import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StripeModule } from "stripe-angular"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from "./auth/auth.interceptor";
import { WelcomeComponent } from './welcome/welcome.component';
import { CookieModule } from 'ngx-cookie';
import { AppInterceptor } from "./app-interceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { MatIconModule } from '@angular/material/icon'
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducers } from "./store/app.reducer";

import { environment } from "src/environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth/store/auth.effects";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MatSnackBarModule, MatDialogModule,
    MatIconModule,

    HttpClientModule,
    CookieModule.forRoot(),
    StripeModule.forRoot("pk_test_51JdfkqIRiTKUTBzlyu2ZokBrkgB2cXadm1a5Fz0uRjU5KjJZpn7hgZEgILHUCDZl5hrX30kfNRwjoYBa3DqAp2j800L4Lvuvku"),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  entryComponents: [
    DialogMessageComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true

    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true

    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
