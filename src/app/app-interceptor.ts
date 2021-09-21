import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { throwError } from "rxjs";
import { catchError, finalize, retry } from "rxjs/operators";

@Injectable()

export class AppInterceptor implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler,) {


        this._snackBar.open("LoAdinG......")
        return next.handle(req)
            .pipe(
                retry(2),
                finalize(() => { this._snackBar.dismiss(); console.log("completed") }),
                catchError((err) => { this._snackBar.dismiss(); console.log("err"); return throwError(err) })
            )
    }
}