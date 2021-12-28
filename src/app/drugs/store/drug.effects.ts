import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import * as drugActions from './drug.actions'
import { map, switchMap, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Drug } from "../drugs.interface";
import { MatDialog } from "@angular/material/dialog";
import { DialogMessageComponent } from "src/app/dialog-message/dialog-message.component";

const BACKEND_URL = environment.apiUrl + "/drug";


@Injectable()
export class DrugEffects {
    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private _dialog: MatDialog
    ) { }


    dialog(message: string) {
        this._dialog.open(DialogMessageComponent, {
            data: { message }
        })
    }


    getDrugs$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(drugActions.TRY_GET_DRUGS),
            map((action: drugActions.TryGetDrugs) => {
                return action.type
            }),
            switchMap((allDrugs) => {
                return this.http.get(`${BACKEND_URL}`)

            }),
            mergeMap((drugs: Drug[]): any => {
                return [

                    {
                        type: drugActions.GET_DRUGS,
                        payload: {
                            drugs: drugs,
                            drug: null
                        }
                    }
                ]
            }),
        )

    )


    getDrug$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(drugActions.TRY_GET_DRUG),
            map((action: drugActions.TryGetDrug) => {
                return action.payload
            }),
            switchMap((drugId) => {
                return this.http.get(`${BACKEND_URL}/${drugId}`)

            }),
            mergeMap((drug: Drug): any => {
                return [

                    {
                        type: drugActions.GET_DRUG,
                        payload: {
                            drug: drug
                        }
                    }
                ]
            }),
        )

    )
}