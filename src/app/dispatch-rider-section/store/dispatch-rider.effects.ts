import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import * as dispatchRiderActions from './dispatch-rider.actions'
import { map, switchMap, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { MatDialog } from "@angular/material/dialog";
import { DialogMessageComponent } from "src/app/dialog-message/dialog-message.component";
import { Order } from "../orders.interface";
const BACKEND_URL = environment.apiUrl + "/order";


@Injectable()
export class DiapatchRiderEffects {
    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private _dialog: MatDialog
    ) { }
}