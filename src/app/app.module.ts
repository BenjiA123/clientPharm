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

@NgModule({
  declarations: [
    AppComponent,
     HeaderComponent, 
     WelcomeComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    CookieModule.forRoot()
   ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true

    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
