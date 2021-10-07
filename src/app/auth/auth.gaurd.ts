import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store<fromApp.AppState>) { }

    public isAuth: boolean
    public userRole: string
    public allowed: boolean
    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot,
        state: import("@angular/router").RouterStateSnapshot):
        boolean | import("@angular/router").UrlTree |
        import("rxjs").Observable<boolean |
        import("@angular/router").UrlTree> | Promise<boolean |
            import("@angular/router").UrlTree> {
        this.store.select('AuthState').subscribe(
            (data: any) => {
                this.isAuth = data.isAuthenticated;
                let curUser: any = data.currentUser
                this.userRole = curUser?.role;

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


        this.allowed = authorized
        return authorized



    }

}

