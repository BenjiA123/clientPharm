import { Action } from "@ngrx/store";

export const TRY_LOGIN = 'TRY_LOGIN'

export const CREATE_USER = 'CREATE_USER'
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export class TryLogin implements Action {
    readonly type = TRY_LOGIN

    constructor(public payload: { username: string, password: string }) { }

}


export class CreateUser implements Action {
    readonly type = CREATE_USER
}

export class CreateCustomer implements Action {
    readonly type = CREATE_CUSTOMER
}

export class Login implements Action {
    readonly type = LOGIN

    constructor(public payload: { token: string, role: string, currentUser: any }) { }

}

export class Logout implements Action {
    readonly type = LOGOUT
}

export type AuthActions = CreateUser | CreateCustomer | Login | Logout | TryLogin
