import { Action } from "@ngrx/store";
import { User } from "../auth.user.interface";

export const TRY_LOGIN = 'TRY_LOGIN'
export const LOGIN = 'LOGIN'


export const CREATE_USER = 'CREATE_USER'

export const SEND_CREATE_USER_EMAIL = 'SEND_CREATE_USER_EMAIL'
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER'
export const LOGOUT = 'LOGOUT'


export class TryLogin implements Action {
    readonly type = TRY_LOGIN

    constructor(public payload: { username: string, password: string }) { }

}

export class Login implements Action {
    readonly type = LOGIN

    constructor(public payload: { token: string, currentUser: any }) { }

}

export class SendCreateUserEmail implements Action {
    readonly type = SEND_CREATE_USER_EMAIL

    constructor(public payload: User) { }

}

export class CreateCustomer implements Action {
    readonly type = CREATE_CUSTOMER
}

export class CreateUser implements Action {
    readonly type = CREATE_USER
}





export class Logout implements Action {
    readonly type = LOGOUT
}

export type AuthActions = CreateUser | CreateCustomer | Login | Logout | TryLogin | SendCreateUserEmail
