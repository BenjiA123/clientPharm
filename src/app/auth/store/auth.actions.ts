import { Action } from "@ngrx/store";


export const CREATE_USER = 'CREATE_USER'
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

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

export type AuthActions = CreateUser | CreateCustomer | Login | Logout
