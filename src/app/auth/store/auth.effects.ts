import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import * as authActions from './auth.actions'
import { map, switchMap, mergeMap } from "rxjs/operators";
import { from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { User } from "../auth.user.interface";
import { MatDialog } from "@angular/material/dialog";
import { DialogMessageComponent } from "src/app/dialog-message/dialog-message.component";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";


const BACKEND_URL = environment.apiUrl + "/user";


@Injectable()
export class AuthEffects {
    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private cookies: CookieService,
        private router: Router,
        private _dialog: MatDialog
    ) { }


    dialog(message: string) {
        this._dialog.open(DialogMessageComponent, {
            data: { message }
        })
    }

    authLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.TRY_LOGIN),
            map((action: authActions.TryLogin) => {
                return action.payload
            }),
            switchMap((authData: { username: string, password: string }) => {

                return from(this.http.post(`${BACKEND_URL}/login`, authData, { observe: 'response' }))
            }),
            mergeMap((responseData: any) => {


                // Verify with only cookie later
                if (responseData.body.token || this.cookies.get('jwt')) {

                    let userRole: string

                    if (userRole == 'MD') { this.router.navigate(["/charts"]) }
                    else if (userRole == 'cachier') { this.router.navigate(["/transactions"]) }
                    else if (userRole == 'pharmacist') { this.router.navigate(["/drugs"]) }
                    else if (userRole == 'customer') { this.router.navigate(["/customer/drugs"]) }

                    else {
                        this.router.navigate(["/"])
                    }

                    return [

                        {
                            type: authActions.LOGIN,
                            payload: {
                                token: responseData.body.token,
                                currentUser: responseData.body.user
                            }
                        }
                    ]
                }
                else { return null }


            })
        ));

    createCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.SEND_CREATE_USER_EMAIL),
            map((action: authActions.SendCreateUserEmail) => {
                return action.payload
            }),
            switchMap((userData: User) => {
                let parameter: string
                if (userData.role == "customer") { parameter = `/${userData.role}` }
                else { parameter = '' }

                return this.http.post(`${BACKEND_URL}${parameter}`, userData)
            }),
            mergeMap((): any => {
                this.dialog("A Token has been sent to Your Email😊.")
            }),
        ),
        { dispatch: false }

    )
}