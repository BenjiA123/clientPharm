import { Action } from "@ngrx/store";
import { Order } from "../orders.interface";

export const GET_ALL_ORDERS = "GET_ALL_ORDERS"


export const TRY_GET_AN_ORDER = "TRY_GET_A_ORDER"
export const GET_AN_ORDER = "GET_A_ORDER"


export class TryGetAllOrders implements Action {
    readonly type = GET_ALL_ORDERS
}


export class GetAllOrder implements Action {
    readonly type = GET_AN_ORDER
    constructor(public payload: { order: Order[] }) { }
}


export class TryGetAnOrder implements Action {
    readonly type = TRY_GET_AN_ORDER
    constructor(public payload: { orderId: string }) { }
}

export class GetAnOrder implements Action {
    readonly type = GET_AN_ORDER
    constructor(public payload: { order: Order }) { }
}


export type DispatchActions = TryGetAllOrders | GetAllOrder | TryGetAnOrder | GetAnOrder
