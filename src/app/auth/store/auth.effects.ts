import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import * as authActions from './auth.actions'
import { map, switchMap, mergeMap } from "rxjs/operators";
import { from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + "/user";


@Injectable()
export class AuthEffects {
    constructor(private http: HttpClient, private actions$: Actions) { }

    authSignUp$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(authActions.TRY_LOGIN),
            map((action: authActions.TryLogin) => {
                return action.payload
            }),
            switchMap((authData: { username: string, password: string }) => {

                return from(this.http.post(`${BACKEND_URL}/login`, authData, { observe: 'response' }))
            }),
            mergeMap((responseData: any) => {

                return [
                    {
                        type: authActions.LOGIN,
                        payload: {
                            token: responseData.token,
                            role: responseData.body.user.role,
                            currentUser: responseData.body.user
                        }
                    }
                ]
            })
        ));
}