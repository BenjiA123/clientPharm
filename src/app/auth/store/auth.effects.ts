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

    automaticLogin$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(authActions.AUTO_LOGIN),
            map((action: authActions.AutomaticLogin) => {
                return action.type

            }),
            switchMap(() => {

                if (this.cookies.get('jwt')) {

                    return this.http.get(`${BACKEND_URL}/get-logged-in-user`)
                }
                else {
                    return []
                }
            }),

            switchMap((userData: any): any => {



                if (!userData) { return [] }
                return [

                    {
                        type: authActions.LOGIN,
                        payload: {
                            token: userData.token,
                            currentUser: userData.user
                        }
                    }
                ]
            })

        )
    )

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


                // Verify with only cookie later Dispatch this action at the begining to authomatically loggin
                if (responseData.body.token || this.cookies.get('jwt')) {

                    let userRole: string = responseData?.body.user.role;

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
            switchMap((): any => {
                this.dialog("A Token has been sent to Your Email😊.")
                return []
            }),
        ),
        { dispatch: false }

    )

    createUserPassword$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(authActions.CREATE_USER_PASSWORD),
            map((action: authActions.CreateUserPassword): any => {

                return action.payload
            }),
            switchMap((passData: any) => {

                return this.http.post(`${BACKEND_URL}/create-password/${passData.token}`,
                    { password: passData.password, confirmPassword: passData.confirmPassword })


            }),
            mergeMap((responseData: any) => {

                console.log(responseData)

                let userRole: string = responseData.user?.role;

                if (userRole != 'customer') { this.router.navigate(["/dashboard"]) }
                if (userRole == 'customer') { this.router.navigate(["/customer/drugs"]) }



                return [

                    {
                        type: authActions.LOGIN,
                        payload: {
                            token: responseData.token,
                            currentUser: responseData.user
                        }
                    }
                ]

            })
        )

    )
}