import { AuthService } from './auth.service';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    public isAuth: boolean
    public userRole
    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot,
        state: import("@angular/router").RouterStateSnapshot):
        boolean | import("@angular/router").UrlTree |
        import("rxjs").Observable<boolean |
        import("@angular/router").UrlTree> | Promise<boolean |
            import("@angular/router").UrlTree> {
        this.authService.getauthStatusListener().subscribe(
            (authStatus: boolean) => {
                this.isAuth = authStatus

            }
        )

        this.authService.getRoleStatusListener().subscribe(
            (roleStatus: string) => {
                this.userRole = roleStatus

            }

        )

        let authorized: boolean = false
        if (!this.isAuth) {
            this.router.navigate(["/"])
        }

        else {
            // You are Authenticated
            let routePath = route.routeConfig.path

            if (this.userRole == "MD" || this.userRole == 'administrator') {
                authorized = true
            }

            else if (this.userRole == 'pharmacist' && routePath == 'drugs') {
                authorized = true

            }

            else if (this.userRole == 'cachier' && routePath == 'transactions') {

                authorized = true

            }
            else {
                authorized = false
            }


            if (routePath == "message") authorized = true
            if (routePath == "dashboard") authorized = true
        }

        if (authorized == false) this.router.navigate(["/"])

        return authorized



    }

}

