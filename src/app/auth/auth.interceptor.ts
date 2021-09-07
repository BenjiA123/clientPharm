import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    intercept(req:HttpRequest<any>,next:HttpHandler){

        const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTFiYjlkMjQ3NGI3NDA4NDkxMzA0ZiIsImlhdCI6MTYzMDY4NzIxMSwiZXhwIjoxNjM4NDYzMjExfQ.Mt_Ewt8y-K98sk2apuJ_Q-fV0QljJDO7_6kerhhlyLM"
        const authRequest = req.clone({
            headers:req.headers.set("Authorization","Bearer "+ authToken )
        })

        return next.handle(authRequest)
    }
}