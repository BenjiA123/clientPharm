import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import * as transactionActions from './transaction.actions'
import { map, switchMap, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { MatDialog } from "@angular/material/dialog";
import { DialogMessageComponent } from "src/app/dialog-message/dialog-message.component";
import { AppTransaction } from "../transaction.interface";

const BACKEND_URL = environment.apiUrl + "/transaction";


@Injectable()
export class TransactionEffects {
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


    getTransactions$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(transactionActions.TRY_GET_TRANSACTIONS),
            map((action: transactionActions.TryGetTransactions) => {
                return action.type
            }),
            switchMap((transactions) => {
                console.log(transactions)
                return this.http.get(`${BACKEND_URL}`)

            }),
            mergeMap((transactions: AppTransaction[]): any => {
                return [

                    {
                        type: transactionActions.GET_TRANSACTIONS,
                        payload: {
                            transactions: transactions,
                        }
                    }
                ]
            }),
        )

    )


    // getDrug$ = createEffect((): any =>
    //     this.actions$.pipe(
    //         ofType(drugActions.TRY_GET_DRUG),
    //         map((action: drugActions.TryGetDrug) => {
    //             return action.payload
    //         }),
    //         switchMap((drugId) => {
    //             return this.http.get(`${BACKEND_URL}/${drugId}`)

    //         }),
    //         mergeMap((drug: Drug): any => {
    //             return [

    //                 {
    //                     type: drugActions.GET_DRUG,
    //                     payload: {
    //                         drug: drug
    //                     }
    //                 }
    //             ]
    //         }),
    //     )

    // )
}