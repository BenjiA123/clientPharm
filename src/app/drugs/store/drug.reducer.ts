import { Drug } from "../drugs.interface"
import * as DrugActions from "./drug.actions"

export interface DrugState {
    drugs: Drug[],
    drug: Drug
}

const initialAuthState: DrugState = {
    drugs: undefined,
    drug: undefined
}

export function DrugReducer(state = initialAuthState, action: DrugActions.DrugActions) {

    switch (action.type) {
        case (DrugActions.GET_DRUGS):
            return {
                ...initialAuthState,
                drugs: action.payload.drugs,
            }

        case (DrugActions.GET_DRUG):
            return {
                ...initialAuthState,
                drug: action.payload.drug,
            }
        default:
            return state


    }
}