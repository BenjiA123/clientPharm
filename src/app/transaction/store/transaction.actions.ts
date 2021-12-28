import { Action } from "@ngrx/store";
import { AppTransaction } from "../transaction.interface";

export const TRY_GET_TRANSACTIONS = 'TRY_GET_TRANSACTIONS'
export const TRY_GET_TRANSACTION = 'TRY_GET_TRANSACTION'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const GET_TRANSACTION = 'GET_TRANSACTION'




export class TryGetTransactions implements Action {
    readonly type = TRY_GET_TRANSACTIONS
}

export class TryGetTransaction implements Action {
    readonly type = TRY_GET_TRANSACTION
    constructor(public payload: { transactionId: String }) { }
}


export class GetTransactions implements Action {
    readonly type = GET_TRANSACTIONS
    payload: { transactions: AppTransaction[] };
}
export class GetTransaction implements Action {
    readonly type = GET_TRANSACTION
    constructor(public payload: { transaction: AppTransaction }) { }

}




export type TransactionActions = TryGetTransactions | TryGetTransaction | GetTransactions | GetTransaction
