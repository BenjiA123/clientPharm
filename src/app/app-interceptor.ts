import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { throwError } from "rxjs";
import { catchError, finalize, retry, timeout } from "rxjs/operators";
import { DialogMessageComponent } from "./dialog-message/dialog-message.component";

@Injectable()

export class AppInterceptor implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler,) {

        this._snackBar.open("LoAdinG......")
        return next.handle(req)
            .pipe(
                // retry(2),
                // timeout(30000),
                finalize(() => {

                    this._snackBar.dismiss();


                }),
                catchError((err: HttpErrorResponse) => {
                    let defaultErrMessage = "Connection Error!!"

                    this._snackBar.dismiss();
                    if (err.error.message) defaultErrMessage = err.error.message


                    this._dialog.open(DialogMessageComponent, {
                        data: { message: defaultErrMessage }
                    })

                    return throwError(err)
                }),
                // retry(2)

            )
    }
}