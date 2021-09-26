import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    CookieModule.forRoot()
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
