import { AuthService } from './auth.service';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService :AuthService,private router:Router,private route:ActivatedRoute){}

    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot,
         state: import("@angular/router").RouterStateSnapshot):
          boolean | import("@angular/router").UrlTree |
           import("rxjs").Observable<boolean | 
           import("@angular/router").UrlTree> | Promise<boolean | 
            import("@angular/router").UrlTree> {
                const isAuth = this.authService.getIsAuth()
                const userRole = this.authService.getRole()
                let authorized:boolean = false
                if(!isAuth){

                    this.router.navigate(["/"])
                }

                else{
                    // You are Authenticated
                    let routePath = route.routeConfig.path

                if(userRole == "MD"){
                    authorized = true
                }

                else if(userRole == 'pharmacist' && routePath == 'drugs'){
                    authorized = true
                    
                }

                else if(userRole == 'cachier' && routePath == 'transactions'){

                    authorized = true
                    
                }
                else{
                    authorized = false
                }


                }

                if(authorized == false)this.router.navigate(["/"])


                return authorized

    }
    
}