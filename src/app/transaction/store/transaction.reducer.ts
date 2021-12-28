import { AppTransaction } from "../transaction.interface";
import * as TransactionActions from "./transaction.actions"

export interface TransactionState {
    transactions: AppTransaction[],
    transaction: AppTransaction
}

const initialAuthState: TransactionState = {
    transactions: undefined,
    transaction: undefined
}

export function TransactionReducer(state = initialAuthState, action: TransactionActions.TransactionActions) {

    switch (action.type) {
        case (TransactionActions.GET_TRANSACTIONS):
            return {
                ...initialAuthState,
                transactions: action.payload.transactions,
            }

        case (TransactionActions.GET_TRANSACTION):
            return {
                ...initialAuthState,
                transaction: action.payload.transaction,
            }
        default:
            return state


    }
}