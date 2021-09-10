import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(req:HttpRequest<any>,next:HttpHandler,){
        const authRequest = req.clone({
            headers:req.headers
            .set( 'Content-Type', 'application/json')
        },
        
        ).clone({withCredentials:true})
        return next.handle(authRequest)
    }
}